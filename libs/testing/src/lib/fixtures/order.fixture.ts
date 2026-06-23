import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { OrderStatus } from '@app/contracts';

export interface OrderItemFixture {
  productId: string;
  quantity: number;
  unitPrice: string;
}

export interface OrderFixture {
  id: string;
  userId: string;
  status: OrderStatus;
  items: OrderItemFixture[];
  totalAmount: string;
  currency: string;
}

export function buildOrderItemFixture(overrides: Partial<OrderItemFixture> = {}): OrderItemFixture {
  return {
    productId: uuidv4(),
    quantity: faker.number.int({ min: 1, max: 10 }),
    unitPrice: faker.commerce.price({ min: 1, max: 999, dec: 2 }),
    ...overrides,
  };
}

export function buildOrderFixture(overrides: Partial<OrderFixture> = {}): OrderFixture {
  const items = overrides.items ?? [buildOrderItemFixture()];
  const totalAmount =
    overrides.totalAmount ??
    items
      .reduce((sum, i) => sum + parseFloat(i.unitPrice) * i.quantity, 0)
      .toFixed(2);
  return {
    id: uuidv4(),
    userId: uuidv4(),
    status: OrderStatus.PendingPayment,
    items,
    totalAmount,
    currency: 'USD',
    ...overrides,
  };
}
