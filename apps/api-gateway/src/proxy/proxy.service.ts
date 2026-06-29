import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthenticatedUser } from '@app/auth';
import { CORRELATION_ID_HEADER } from '@app/observability';

export type UpstreamService = 'auth' | 'product' | 'orders';

type AuthedRequest = Request & { user?: AuthenticatedUser };

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);
  private readonly timeoutMs: number;
  private readonly serviceUrls: Record<UpstreamService, string>;

  constructor(private readonly config: ConfigService) {
    this.timeoutMs = this.config.get<number>('UPSTREAM_TIMEOUT_MS', 10_000);
    this.serviceUrls = {
      auth: this.config.getOrThrow<string>('AUTH_SERVICE_URL'),
      product: this.config.getOrThrow<string>('PRODUCT_SERVICE_URL'),
      orders: this.config.getOrThrow<string>('ORDERS_SERVICE_URL'),
    };
  }

  async forward(req: Request, res: Response, service: UpstreamService): Promise<void> {
    const authedReq = req as AuthedRequest;
    const targetUrl = `${this.serviceUrls[service]}${req.originalUrl}`;
    const correlationId = (req.headers[CORRELATION_ID_HEADER] as string) ?? '';

    const forwardHeaders: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (['host', 'authorization', 'content-length'].includes(key)) continue;
      if (typeof value === 'string') forwardHeaders[key] = value;
      else if (Array.isArray(value)) forwardHeaders[key] = value.join(', ');
    }

    if (authedReq.user) {
      forwardHeaders['x-user-id'] = authedReq.user.userId;
      forwardHeaders['x-user-roles'] = authedReq.user.roles.join(',');
    }

    let body: string | null = null;
    const isBodyMethod = !['GET', 'HEAD', 'OPTIONS'].includes(req.method.toUpperCase());
    if (isBodyMethod && req.body && Object.keys(req.body as object).length > 0) {
      body = JSON.stringify(req.body);
      forwardHeaders['content-type'] = 'application/json';
      forwardHeaders['content-length'] = Buffer.byteLength(body).toString();
    }

    try {
      const upstream = await fetch(targetUrl, {
        method: req.method,
        headers: forwardHeaders,
        body: isBodyMethod ? body : null,
        signal: AbortSignal.timeout(this.timeoutMs),
      });

      const responseHeaders: Record<string, string> = {};
      upstream.headers.forEach((value, key) => {
        if (!['transfer-encoding', 'connection', 'keep-alive'].includes(key.toLowerCase())) {
          responseHeaders[key] = value;
        }
      });
      responseHeaders[CORRELATION_ID_HEADER] = correlationId;

      res.writeHead(upstream.status, responseHeaders);
      res.end(Buffer.from(await upstream.arrayBuffer()));
    } catch (err) {
      this.logger.error(`Proxy error → ${service}: ${(err as Error).message}`);
      if (res.headersSent) return;

      const isTimeout =
        err instanceof Error && (err.name === 'TimeoutError' || err.name === 'AbortError');

      res.status(isTimeout ? 504 : 502).json({
        error: {
          code: isTimeout ? 'UPSTREAM_TIMEOUT' : 'UPSTREAM_ERROR',
          message: isTimeout ? 'Upstream service timed out' : 'Upstream service unavailable',
          details: [],
        },
        meta: { correlationId },
      });
    }
  }
}
