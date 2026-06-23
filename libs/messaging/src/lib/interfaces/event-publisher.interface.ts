export interface EventPublisher {
  publish<T extends object>(routingKey: string, payload: T, correlationId?: string): Promise<void>;
}

export const EVENT_PUBLISHER = Symbol('EVENT_PUBLISHER');
