export const EXCHANGE = 'domain.events';

export const RoutingKey = {
  UserRegistered: 'user.registered',
  UserLoggedIn: 'user.logged_in',
  ProductCreated: 'product.created',
  ProductUpdated: 'product.updated',
  ProductStockChanged: 'product.stock_changed',
  OrderCreated: 'order.created',
  OrderConfirmed: 'order.confirmed',
  OrderCancelled: 'order.cancelled',
  PaymentSucceeded: 'payment.succeeded',
  PaymentFailed: 'payment.failed',
  PaymentRefunded: 'payment.refunded',
  NotificationSent: 'notification.sent',
} as const;

export const Queue = {
  AuthUserEvents: 'auth.user-events',
  OrdersProductSync: 'orders.product-sync',
  ProductOrderEvents: 'product.order-events',
  OrdersPaymentEvents: 'orders.payment-events',
  PaymentOrderEvents: 'payment.order-events',
  NotificationAll: 'notification.all',
} as const;
