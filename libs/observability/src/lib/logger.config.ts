import { Params } from 'nestjs-pino';
import { CORRELATION_ID_HEADER } from './correlation-id.middleware';

export function buildLoggerConfig(serviceName: string): Params {
  return {
    pinoHttp: {
      level: process.env['LOG_LEVEL'] ?? 'info',
      transport:
        process.env['NODE_ENV'] !== 'production'
          ? { target: 'pino-pretty', options: { colorize: true, translateTime: 'HH:MM:ss' } }
          : undefined,
      customProps: (_req: unknown) => ({
        service: serviceName,
      }),
      redact: ['req.headers.authorization', 'req.body.password', 'req.body.refreshToken'],
      autoLogging: {
        ignore: (req: { url?: string }) =>
          req.url === '/health/live' || req.url === '/health/ready',
      },
    } as Params['pinoHttp'],
  };
}
