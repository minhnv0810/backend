import { Module } from '@nestjs/common';
import { ProductClientService } from './product-client.service';

@Module({
  providers: [ProductClientService],
  exports: [ProductClientService],
})
export class ProductClientModule {}
