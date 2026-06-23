import { v4 as uuidv4 } from 'uuid';

export interface OutboxEvent {
  id: string;
  routingKey: string;
  payload: string;
  createdAt: Date;
  publishedAt: Date | null;
}

export interface OutboxWriter {
  outboxEvents: {
    create: (args: { data: Omit<OutboxEvent, 'publishedAt'> }) => Promise<OutboxEvent>;
  };
}

export function buildOutboxEvent(
  routingKey: string,
  payload: object,
): Omit<OutboxEvent, 'publishedAt'> {
  return {
    id: uuidv4(),
    routingKey,
    payload: JSON.stringify(payload),
    createdAt: new Date(),
  };
}
