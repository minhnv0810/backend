import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../generated/prisma';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ListProductsDto } from './dto/list-products.dto';
import { AvailabilityItemDto } from './dto/check-availability.dto';

const productInclude = {
  categories: { include: { category: true } },
  stock: true,
} satisfies Prisma.ProductInclude;

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: productInclude,
    });
  }

  findBySku(sku: string) {
    return this.prisma.product.findUnique({ where: { sku } });
  }

  async findAll(filters: ListProductsDto) {
    const { page = 1, limit = 20, category, q, sort, minPrice, maxPrice } = filters;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {};

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { sku: { contains: q, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.categories = { some: { categoryId: category } };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = new Prisma.Decimal(minPrice);
      if (maxPrice !== undefined) where.price.lte = new Prisma.Decimal(maxPrice);
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
    if (sort) {
      const [field, dir] = sort.split(':');
      if (field === 'price' && (dir === 'asc' || dir === 'desc')) {
        orderBy = { price: dir };
      } else if (field === 'name' && (dir === 'asc' || dir === 'desc')) {
        orderBy = { name: dir };
      }
    }

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: productInclude,
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return { items, total, page, limit };
  }

  create(dto: CreateProductDto, outboxPayload: { routingKey: string; payload: object }) {
    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          sku: dto.sku,
          name: dto.name,
          description: dto.description,
          price: new Prisma.Decimal(dto.price),
          currency: dto.currency ?? 'USD',
          categories: dto.categoryIds?.length
            ? { create: dto.categoryIds.map((categoryId) => ({ categoryId })) }
            : undefined,
          stock: {
            create: { quantityAvailable: dto.initialStock ?? 0 },
          },
        },
        include: productInclude,
      });

      const payload = outboxPayload.payload as Record<string, unknown>;
      await tx.outbox.create({
        data: {
          routingKey: outboxPayload.routingKey,
          payload: { ...payload, productId: product.id },
        },
      });

      return product;
    });
  }

  update(
    id: string,
    dto: UpdateProductDto,
    outboxPayload: { routingKey: string; payload: object },
  ) {
    return this.prisma.$transaction(async (tx) => {
      if (dto.categoryIds !== undefined) {
        await tx.productCategory.deleteMany({ where: { productId: id } });
        if (dto.categoryIds.length > 0) {
          await tx.productCategory.createMany({
            data: dto.categoryIds.map((categoryId) => ({ productId: id, categoryId })),
          });
        }
      }

      const product = await tx.product.update({
        where: { id },
        data: {
          name: dto.name,
          description: dto.description,
          price: dto.price !== undefined ? new Prisma.Decimal(dto.price) : undefined,
          currency: dto.currency,
          status: dto.status,
        },
        include: productInclude,
      });

      await tx.outbox.create({
        data: { routingKey: outboxPayload.routingKey, payload: outboxPayload.payload },
      });

      return product;
    });
  }

  async adjustStock(
    productId: string,
    delta: number,
    outboxPayload: { routingKey: string; payload: object },
  ) {
    return this.prisma.$transaction(async (tx) => {
      const result = await tx.$queryRaw<{ quantity_available: number }[]>`
        UPDATE stock
        SET quantity_available = quantity_available + ${delta}, updated_at = now()
        WHERE product_id = ${productId}::uuid
          AND quantity_available + ${delta} >= 0
        RETURNING quantity_available
      `;

      if (result.length === 0) {
        throw new UnprocessableEntityException({
          error: {
            code: 'STOCK_WOULD_GO_NEGATIVE',
            message: 'Stock adjustment would result in negative quantity',
          },
        });
      }

      await tx.outbox.create({
        data: { routingKey: outboxPayload.routingKey, payload: outboxPayload.payload },
      });

      return result[0].quantity_available;
    });
  }

  async setStock(
    productId: string,
    qty: number,
    outboxPayload: { routingKey: string; payload: object },
  ) {
    return this.prisma.$transaction(async (tx) => {
      const stock = await tx.stock.update({
        where: { productId },
        data: { quantityAvailable: qty },
      });

      await tx.outbox.create({
        data: { routingKey: outboxPayload.routingKey, payload: outboxPayload.payload },
      });

      return stock.quantityAvailable;
    });
  }

  findManyByIds(ids: string[]) {
    return this.prisma.product.findMany({
      where: { id: { in: ids } },
      include: { stock: true },
    });
  }

  checkAndDecrementForOrder(items: AvailabilityItemDto[]) {
    return this.prisma.$transaction(async (tx) => {
      for (const item of items) {
        const result = await tx.$queryRaw<{ quantity_available: number }[]>`
          UPDATE stock
          SET quantity_available = quantity_available - ${item.quantity}, updated_at = now()
          WHERE product_id = ${item.productId}::uuid
            AND quantity_available - ${item.quantity} >= 0
          RETURNING quantity_available
        `;

        if (result.length === 0) {
          throw new UnprocessableEntityException({
            error: {
              code: 'STOCK_WOULD_GO_NEGATIVE',
              message: `Insufficient stock for product ${item.productId}`,
            },
          });
        }
      }
    });
  }

  releaseStock(items: { productId: string; quantity: number }[], eventId: string) {
    return this.prisma.$transaction(async (tx) => {
      const alreadyProcessed = await tx.processedEvent.findUnique({
        where: { eventId },
      });
      if (alreadyProcessed) return;

      for (const item of items) {
        await tx.stock.updateMany({
          where: { productId: item.productId },
          data: { quantityAvailable: { increment: item.quantity } },
        });
      }

      await tx.processedEvent.create({ data: { eventId } });
    });
  }
}
