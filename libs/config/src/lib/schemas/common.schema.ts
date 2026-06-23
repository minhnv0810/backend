import { z } from 'zod';

export const CommonSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  CORRELATION_ID_HEADER: z.string().default('x-correlation-id'),
});

export type CommonConfig = z.infer<typeof CommonSchema>;
