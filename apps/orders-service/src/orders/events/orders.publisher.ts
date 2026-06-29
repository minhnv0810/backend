import { v4 as uuidv4 } from 'uuid';
import { RoutingKey, OrderCreatedV1, OrderConfirmedV1, OrderCancelledV1 } from '@app/contracts';
import { Prisma } from '../../generated/prisma';
import { OrderWithItems } from '../orders.repository';

export function buildOrderCreatedEvent(
  orderId: string,
  userId: string,
  items: { productId: string; quantity: number }[],
  snapshots: { productId: string; price: Prisma.Decimal; currency: string }[],
): { routingKey: string; payload: OrderCreatedV1 } {
  const snapshotMap = new Map(snapshots.map((s) => [s.productId, s]));
  const currency = snapshots[0]?.currency ?? 'USD';
  const totalAmount = items
    .reduce((sum, item) => {
      const snap = snapshotMap.get(item.productId)!;
      return sum.add(snap.price.mul(item.quantity));
    }, new Prisma.Decimal(0))
    .toString();

  return {
    routingKey: RoutingKey.OrderCreated,
    payload: {
      eventId: uuidv4(),
      version: 1,
      occurredAt: new Date().toISOString(),
      orderId,
      userId,
      items: items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        unitPrice: snapshotMap.get(i.productId)!.price.toString(),
      })),
      totalAmount,
      currency,
    },
  };
}

export function buildOrderConfirmedEvent(
  orderId: string,
  userId: string,
): { routingKey: string; payload: OrderConfirmedV1 } {
  return {
    routingKey: RoutingKey.OrderConfirmed,
    payload: {
      eventId: uuidv4(),
      version: 1,
      occurredAt: new Date().toISOString(),
      orderId,
      userId,
    },
  };
}

export function buildOrderCancelledEvent(
  order: OrderWithItems,
  reason: string,
): {
  routingKey: string;
  payload: OrderCancelledV1 & { items: { productId: string; quantity: number }[] };
} {
  return {
    routingKey: RoutingKey.OrderCancelled,
    payload: {
      eventId: uuidv4(),
      version: 1,
      occurredAt: new Date().toISOString(),
      orderId: order.id,
      userId: order.userId,
      reason,
      items: order.items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
    },
  };
}
