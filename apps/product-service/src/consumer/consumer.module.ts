import { Module } from '@nestjs/common';
import { OrderEventsConsumer } from './order-events.consumer';
import { ProductModule } from '../product/product.module';
import { MessagingModule } from '@app/messaging';

@Module({
  imports: [MessagingModule, ProductModule],
  providers: [OrderEventsConsumer],
})
export class ConsumerModule {}
