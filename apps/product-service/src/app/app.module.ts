import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppConfigModule, ProductServiceSchema } from '@app/config';
import { ObservabilityModule } from '@app/observability';
import { MessagingModule } from '@app/messaging';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductModule } from '../product/product.module';
import { CategoryModule } from '../category/category.module';
import { OutboxModule } from '../outbox/outbox.module';
import { ConsumerModule } from '../consumer/consumer.module';

@Module({
  imports: [
    AppConfigModule.forRoot(ProductServiceSchema),
    ObservabilityModule.forRoot('product-service'),
    ScheduleModule.forRoot(),
    MessagingModule.forRoot({
      url: process.env['RABBITMQ_URL'] ?? 'amqp://rabbit:rabbit@localhost:5672',
      declareTopology: true,
    }),
    PrismaModule,
    ProductModule,
    CategoryModule,
    OutboxModule,
    ConsumerModule,
  ],
})
export class AppModule {}
