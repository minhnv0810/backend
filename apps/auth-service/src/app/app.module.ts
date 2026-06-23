import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppConfigModule, AuthServiceSchema } from '@app/config';
import { ObservabilityModule } from '@app/observability';
import { MessagingModule } from '@app/messaging';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { OutboxModule } from '../outbox/outbox.module';

@Module({
  imports: [
    AppConfigModule.forRoot(AuthServiceSchema),
    ObservabilityModule.forRoot('auth-service'),
    ScheduleModule.forRoot(),
    MessagingModule.forRoot({
      url: process.env['RABBITMQ_URL'] ?? 'amqp://rabbit:rabbit@localhost:5672',
      declareTopology: true,
    }),
    PrismaModule,
    AuthModule,
    OutboxModule,
  ],
})
export class AppModule {}
