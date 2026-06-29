import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiSecurity } from '@nestjs/swagger';
import { Request } from 'express';
import { ForwardedIdentityGuard, RolesGuard, Roles } from '@app/auth';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ListProductsDto } from './dto/list-products.dto';
import { AdjustStockDto } from './dto/adjust-stock.dto';
import { CheckAvailabilityDto } from './dto/check-availability.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'List products' })
  async listProducts(@Query() dto: ListProductsDto, @Req() req: Request) {
    const correlationId = (req.headers['x-correlation-id'] as string) ?? '';
    const data = await this.productService.listProducts(dto);
    return { data, meta: { correlationId } };
  }

  @Post('availability')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Check product availability' })
  async checkAvailability(@Body() dto: CheckAvailabilityDto, @Req() req: Request) {
    const correlationId = (req.headers['x-correlation-id'] as string) ?? '';
    const data = await this.productService.checkAvailability(dto);
    return { data, meta: { correlationId } };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by id' })
  async getProduct(@Param('id') id: string, @Req() req: Request) {
    const correlationId = (req.headers['x-correlation-id'] as string) ?? '';
    const data = await this.productService.getProduct(id);
    return { data, meta: { correlationId } };
  }

  @Post()
  @UseGuards(ForwardedIdentityGuard, RolesGuard)
  @Roles('admin')
  @ApiSecurity('x-user-id')
  @ApiSecurity('x-user-roles')
  @ApiOperation({ summary: 'Create product (admin)' })
  async createProduct(@Body() dto: CreateProductDto, @Req() req: Request) {
    const correlationId = (req.headers['x-correlation-id'] as string) ?? '';
    const data = await this.productService.createProduct(dto, correlationId);
    return { data, meta: { correlationId } };
  }

  @Patch(':id')
  @UseGuards(ForwardedIdentityGuard, RolesGuard)
  @Roles('admin')
  @ApiSecurity('x-user-id')
  @ApiSecurity('x-user-roles')
  @ApiOperation({ summary: 'Update product (admin)' })
  async updateProduct(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @Req() req: Request,
  ) {
    const correlationId = (req.headers['x-correlation-id'] as string) ?? '';
    const data = await this.productService.updateProduct(id, dto, correlationId);
    return { data, meta: { correlationId } };
  }

  @Post(':id/stock')
  @UseGuards(ForwardedIdentityGuard, RolesGuard)
  @Roles('admin')
  @ApiSecurity('x-user-id')
  @ApiSecurity('x-user-roles')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Adjust product stock (admin)' })
  async adjustStock(
    @Param('id') id: string,
    @Body() dto: AdjustStockDto,
    @Req() req: Request,
  ) {
    const correlationId = (req.headers['x-correlation-id'] as string) ?? '';
    const data = await this.productService.adjustStock(id, dto, correlationId);
    return { data, meta: { correlationId } };
  }
}
