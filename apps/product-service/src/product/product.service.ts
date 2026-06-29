import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  RoutingKey,
  ProductCreatedV1,
  ProductUpdatedV1,
  ProductStockChangedV1,
  OrderCancelledV1,
} from '@app/contracts';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ListProductsDto } from './dto/list-products.dto';
import { AdjustStockDto } from './dto/adjust-stock.dto';
import { CheckAvailabilityDto } from './dto/check-availability.dto';

interface OrderCancelledWithItems extends OrderCancelledV1 {
  items?: { productId: string; quantity: number }[];
}

@Injectable()
export class ProductService {
  constructor(private readonly repo: ProductRepository) {}

  async listProducts(dto: ListProductsDto) {
    return this.repo.findAll(dto);
  }

  async getProduct(id: string) {
    const product = await this.repo.findById(id);
    if (!product) {
      throw new NotFoundException({
        error: { code: 'PRODUCT_NOT_FOUND', message: `Product ${id} not found` },
      });
    }
    return product;
  }

  async createProduct(dto: CreateProductDto, _correlationId: string) {
    const existing = await this.repo.findBySku(dto.sku);
    if (existing) {
      throw new ConflictException({
        error: { code: 'SKU_ALREADY_EXISTS', message: `SKU ${dto.sku} already exists` },
      });
    }

    return this.repo.create(dto, {
      routingKey: RoutingKey.ProductCreated,
      payload: {
        eventId: uuidv4(),
        version: 1,
        occurredAt: new Date().toISOString(),
        productId: '',
        name: dto.name,
        price: dto.price,
        currency: dto.currency ?? 'USD',
        stock: dto.initialStock ?? 0,
        categoryId: dto.categoryIds?.[0] ?? null,
      } satisfies ProductCreatedV1,
    });
  }

  async updateProduct(id: string, dto: UpdateProductDto, _correlationId: string) {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw new NotFoundException({
        error: { code: 'PRODUCT_NOT_FOUND', message: `Product ${id} not found` },
      });
    }

    const payload: ProductUpdatedV1 = {
      eventId: uuidv4(),
      version: 1,
      occurredAt: new Date().toISOString(),
      productId: id,
      name: dto.name ?? existing.name,
      price: dto.price ?? existing.price.toString(),
      currency: dto.currency ?? existing.currency,
      categoryId: dto.categoryIds?.[0] ?? existing.categories[0]?.categoryId ?? null,
    };

    return this.repo.update(id, dto, { routingKey: RoutingKey.ProductUpdated, payload });
  }

  async adjustStock(id: string, dto: AdjustStockDto, _correlationId: string) {
    const product = await this.repo.findById(id);
    if (!product) {
      throw new NotFoundException({
        error: { code: 'PRODUCT_NOT_FOUND', message: `Product ${id} not found` },
      });
    }

    if (dto.delta === undefined && dto.set === undefined) {
      throw new ConflictException({
        error: { code: 'INVALID_REQUEST', message: 'Either delta or set must be provided' },
      });
    }

    const previousQty = product.stock?.quantityAvailable ?? 0;

    const buildOutbox = (newQty: number): { routingKey: string; payload: ProductStockChangedV1 } => ({
      routingKey: RoutingKey.ProductStockChanged,
      payload: {
        eventId: uuidv4(),
        version: 1,
        occurredAt: new Date().toISOString(),
        productId: id,
        previousQty,
        newQty,
        reason: 'manual_adjustment',
      },
    });

    let newQty: number;
    if (dto.delta !== undefined) {
      newQty = await this.repo.adjustStock(id, dto.delta, buildOutbox(previousQty + dto.delta));
    } else {
      newQty = await this.repo.setStock(id, dto.set!, buildOutbox(dto.set!));
    }

    return { productId: id, quantityAvailable: newQty };
  }

  async checkAvailability(dto: CheckAvailabilityDto) {
    const ids = dto.items.map((i) => i.productId);
    const products = await this.repo.findManyByIds(ids);
    const productMap = new Map(products.map((p) => [p.id, p]));

    const itemResults = dto.items.map((item) => {
      const product = productMap.get(item.productId);
      if (!product?.stock) {
        return {
          productId: item.productId,
          requested: item.quantity,
          available: 0,
          price: null,
          currency: null,
          isAvailable: false,
        };
      }
      const available = product.stock.quantityAvailable;
      return {
        productId: item.productId,
        requested: item.quantity,
        available,
        price: product.price.toString(),
        currency: product.currency,
        isAvailable: available >= item.quantity,
      };
    });

    return {
      allAvailable: itemResults.every((r) => r.isAvailable),
      items: itemResults,
    };
  }

  async handleOrderCancelled(payload: OrderCancelledWithItems) {
    const items = payload.items;
    if (!items?.length) return;
    await this.repo.releaseStock(items, payload.eventId);
  }
}
