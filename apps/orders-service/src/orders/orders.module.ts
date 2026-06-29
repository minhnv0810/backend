import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { OrdersConsumer } from './events/orders.consumer';
import { ProductClientModule } from '../product-client/product-client.module';

@Module({
  imports: [ProductClientModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository, OrdersConsumer],
})
export class OrdersModule {}
