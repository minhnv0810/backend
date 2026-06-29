import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiSecurity, ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';
import { ForwardedIdentityGuard, CurrentUser, AuthenticatedUser } from '@app/auth';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CancelOrderDto } from './dto/cancel-order.dto';

@ApiTags('orders')
@ApiSecurity('x-user-id')
@ApiSecurity('x-user-roles')
@Controller('orders')
@UseGuards(ForwardedIdentityGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'List orders for current user' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async listOrders(
    @CurrentUser() user: AuthenticatedUser,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Req() req?: Request,
  ) {
    const correlationId = (req?.headers['x-correlation-id'] as string) ?? '';
    const data = await this.ordersService.listOrders(user.userId, page, limit);
    return { data, meta: { correlationId } };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by id' })
  async getOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
    @Req() req: Request,
  ) {
    const correlationId = (req.headers['x-correlation-id'] as string) ?? '';
    const data = await this.ordersService.getOrder(id, user.userId);
    return { data, meta: { correlationId } };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  async createOrder(
    @Body() dto: CreateOrderDto,
    @CurrentUser() user: AuthenticatedUser,
    @Req() req: Request,
  ) {
    const correlationId = (req.headers['x-correlation-id'] as string) ?? '';
    const data = await this.ordersService.createOrder(dto, user.userId, correlationId);
    return { data, meta: { correlationId } };
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel an order' })
  async cancelOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CancelOrderDto,
    @CurrentUser() user: AuthenticatedUser,
    @Req() req: Request,
  ) {
    const correlationId = (req.headers['x-correlation-id'] as string) ?? '';
    const data = await this.ordersService.cancelOrder(id, dto, user.userId);
    return { data, meta: { correlationId } };
  }
}
