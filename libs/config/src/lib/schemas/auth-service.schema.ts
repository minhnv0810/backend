import { z } from 'zod';
import { CommonSchema } from './common.schema';

export const AuthServiceSchema = CommonSchema.extend({
  DATABASE_URL: z.string().url(),
  RABBITMQ_URL: z.string().url(),
  RABBITMQ_EXCHANGE: z.string().default('domain.events'),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  JWT_ACCESS_TOKEN_TTL: z.coerce.number().default(900),
  JWT_REFRESH_TOKEN_TTL: z.coerce.number().default(604800),
  JWT_AUDIENCE: z.string().default('ecommerce-api'),
  JWT_ISSUER: z.string().default('auth-service'),
});

export type AuthServiceConfig = z.infer<typeof AuthServiceSchema>;
