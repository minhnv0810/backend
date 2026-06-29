import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  Logger,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { OrdersRepository } from './orders.repository';
import { ProductClientService } from '../product-client/product-client.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CancelOrderDto } from './dto/cancel-order.dto';
import {
  buildOrderCreatedEvent,
  buildOrderConfirmedEvent,
  buildOrderCancelledEvent,
} from './events/orders.publisher';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    private readonly repo: OrdersRepository,
    private readonly productClient: ProductClientService,
  ) {}

  async listOrders(userId: string, rawPage?: number, rawLimit?: number) {
    const page = Number.isFinite(rawPage) && rawPage! > 0 ? rawPage! : 1;
    const limit = Number.isFinite(rawLimit) && rawLimit! > 0 ? Math.min(rawLimit!, 100) : 20;
    const [items, total] = await this.repo.findByUser(userId, page, limit);
    return { items, total, page, limit };
  }

  async getOrder(id: string, userId: string) {
    const order = await this.repo.findById(id);
    if (!order || order.userId !== userId) {
      throw new NotFoundException({
        error: { code: 'ORDER_NOT_FOUND', message: `Order ${id} not found` },
      });
    }
    return order;
  }

  async createOrder(dto: CreateOrderDto, userId: string, correlationId: string) {
    const existing = await this.repo.findByIdempotencyKey(dto.idempotencyKey);
    if (existing) {
      this.logger.log(`Duplicate idempotencyKey ${dto.idempotencyKey} — returning original`);
      return existing.order;
    }

    await this.productClient.checkAvailability(dto.items, correlationId);

    const productIds = dto.items.map((i) => i.productId);
    const snapshots = await this.repo.findSnapshotsByIds(productIds);

    const missingIds = productIds.filter((id) => !snapshots.find((s) => s.productId === id));
    if (missingIds.length > 0) {
      throw new UnprocessableEntityException({
        error: {
          code: 'PRODUCT_SNAPSHOT_MISSING',
          message: `No price snapshot for product(s): ${missingIds.join(', ')}`,
        },
      });
    }

    // Pre-generate orderId so events can be built before insertion
    const orderId = uuidv4();
    const createdEvent = buildOrderCreatedEvent(orderId, userId, dto.items, snapshots);
    const confirmedEvent = buildOrderConfirmedEvent(orderId, userId);

    return this.repo.createAndConfirmOrder(orderId, dto, userId, snapshots, [
      createdEvent,
      confirmedEvent,
    ]);
  }

  async cancelOrder(id: string, dto: CancelOrderDto, userId: string) {
    const order = await this.getOrder(id, userId);

    if (order.status !== 'PENDING_PAYMENT') {
      throw new UnprocessableEntityException({
        error: {
          code: 'INVALID_ORDER_STATE',
          message: `Cannot cancel an order with status ${order.status}`,
        },
      });
    }

    const reason = dto.reason ?? 'Customer cancelled';
    return this.repo.cancelOrder(id, buildOrderCancelledEvent(order, reason));
  }
}
