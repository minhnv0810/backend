export enum Role {
  Customer = 'customer',
  Admin = 'admin',
}

export enum OrderStatus {
  PendingPayment = 'PENDING_PAYMENT',
  Confirmed = 'CONFIRMED',
  Cancelled = 'CANCELLED',
  Refunded = 'REFUNDED',
}

export enum PaymentStatus {
  Pending = 'PENDING',
  Succeeded = 'SUCCEEDED',
  Failed = 'FAILED',
  Refunded = 'REFUNDED',
}
