import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CORRELATION_ID_HEADER } from '@app/observability';

const STATUS_CODES: Record<number, string> = {
  400: 'BAD_REQUEST',
  401: 'INVALID_TOKEN',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  422: 'UNPROCESSABLE',
  429: 'RATE_LIMIT_EXCEEDED',
  500: 'INTERNAL_ERROR',
  502: 'UPSTREAM_ERROR',
  503: 'SERVICE_UNAVAILABLE',
  504: 'UPSTREAM_TIMEOUT',
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    if (res.headersSent) return;

    const status = exception.getStatus();
    const correlationId = (req.headers[CORRELATION_ID_HEADER] as string) ?? '';
    const code = STATUS_CODES[status] ?? 'INTERNAL_ERROR';
    const raw = exception.getResponse();
    const message =
      typeof raw === 'object' && raw !== null && 'message' in raw
        ? (raw as Record<string, unknown>).message
        : exception.message;

    res.status(status).json({
      error: { code, message, details: [] },
      meta: { correlationId },
    });
  }
}
