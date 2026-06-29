import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppConfigModule, OrdersServiceSchema } from '@app/config';
import { ObservabilityModule } from '@app/observability';
import { MessagingModule } from '@app/messaging';
import { PrismaModule } from '../prisma/prisma.module';
import { OrdersModule } from '../orders/orders.module';
import { OutboxModule } from '../outbox/outbox.module';

@Module({
  imports: [
    AppConfigModule.forRoot(OrdersServiceSchema),
    ObservabilityModule.forRoot('orders-service'),
    ScheduleModule.forRoot(),
    MessagingModule.forRoot({
      url: process.env['RABBITMQ_URL'] ?? 'amqp://rabbit:rabbit@localhost:5672',
      declareTopology: false,
    }),
    PrismaModule,
    OrdersModule,
    OutboxModule,
  ],
})
export class AppModule {}
