import { z } from 'zod';
import { CommonSchema } from './common.schema';

export const GatewaySchema = CommonSchema.extend({
  JWT_PUBLIC_KEY: z.string(),
  JWT_AUDIENCE: z.string().default('ecommerce-api'),
  JWT_ISSUER: z.string().default('auth-service'),
  AUTH_SERVICE_URL: z.string().url(),
  PRODUCT_SERVICE_URL: z.string().url(),
  ORDERS_SERVICE_URL: z.string().url(),
  UPSTREAM_TIMEOUT_MS: z.coerce.number().default(10000),
  CORS_ORIGINS: z
    .string()
    .transform((val) => val.split(',').map((s) => s.trim())),
  THROTTLE_GLOBAL_LIMIT: z.coerce.number().default(100),
  THROTTLE_GLOBAL_TTL_MS: z.coerce.number().default(60000),
  THROTTLE_AUTH_LIMIT: z.coerce.number().default(10),
  THROTTLE_AUTH_TTL_MS: z.coerce.number().default(60000),
});

export type GatewayConfig = z.infer<typeof GatewaySchema>;
