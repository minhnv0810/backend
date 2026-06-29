import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
