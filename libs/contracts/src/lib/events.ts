export interface EventEnvelope {
  eventId: string;
  version: number;
  occurredAt: string;
}

export interface UserRegisteredV1 extends EventEnvelope {
  version: 1;
  userId: string;
  email: string;
  displayName: string;
}

export interface UserLoggedInV1 extends EventEnvelope {
  version: 1;
  userId: string;
  email: string;
}

export interface ProductCreatedV1 extends EventEnvelope {
  version: 1;
  productId: string;
  name: string;
  price: string;
  currency: string;
  stock: number;
  categoryId: string | null;
}

export interface ProductUpdatedV1 extends EventEnvelope {
  version: 1;
  productId: string;
  name: string;
  price: string;
  currency: string;
  categoryId: string | null;
}

export interface ProductStockChangedV1 extends EventEnvelope {
  version: 1;
  productId: string;
  previousQty: number;
  newQty: number;
  reason: 'order_reserved' | 'order_released' | 'manual_adjustment';
}

export interface OrderCreatedV1 extends EventEnvelope {
  version: 1;
  orderId: string;
  userId: string;
  items: { productId: string; quantity: number; unitPrice: string }[];
  totalAmount: string;
  currency: string;
}

export interface OrderConfirmedV1 extends EventEnvelope {
  version: 1;
  orderId: string;
  userId: string;
}

export interface OrderCancelledV1 extends EventEnvelope {
  version: 1;
  orderId: string;
  userId: string;
  reason: string;
}
