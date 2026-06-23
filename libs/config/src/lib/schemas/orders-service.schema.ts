import { z } from 'zod';
import { CommonSchema } from './common.schema';

export const OrdersServiceSchema = CommonSchema.extend({
  DATABASE_URL: z.string().url(),
  RABBITMQ_URL: z.string().url(),
  RABBITMQ_EXCHANGE: z.string().default('domain.events'),
  PRODUCT_SERVICE_URL: z.string().url(),
  PRODUCT_SERVICE_TIMEOUT_MS: z.coerce.number().default(3000),
});

export type OrdersServiceConfig = z.infer<typeof OrdersServiceSchema>;
