import { z } from 'zod';
import { CommonSchema } from './common.schema';

export const ProductServiceSchema = CommonSchema.extend({
  DATABASE_URL: z.string().url(),
  RABBITMQ_URL: z.string().url(),
  RABBITMQ_EXCHANGE: z.string().default('domain.events'),
});

export type ProductServiceConfig = z.infer<typeof ProductServiceSchema>;
