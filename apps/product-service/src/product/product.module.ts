import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { LocalJwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [PassportModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, LocalJwtStrategy],
  exports: [ProductService],
})
export class ProductModule {}
