import { Module } from '@nestjs/common';
import { AppConfigModule, OrdersServiceSchema } from '@app/config';
import { ObservabilityModule } from '@app/observability';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AppConfigModule.forRoot(OrdersServiceSchema),
    ObservabilityModule.forRoot('orders-service'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
