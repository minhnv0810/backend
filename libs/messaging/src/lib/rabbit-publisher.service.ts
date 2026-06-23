import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  Logger,
  Inject,
} from '@nestjs/common';
import { connect, AmqpConnectionManager, ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';
import { v4 as uuidv4 } from 'uuid';
import { EXCHANGE, Queue, RoutingKey } from '@app/contracts';
import { EventPublisher } from './interfaces/event-publisher.interface';
import { MessagingOptions, MESSAGING_OPTIONS } from './messaging.options';

interface QueueBinding {
  queue: string;
  routingKeys: string[];
}

const PHASE1_BINDINGS: QueueBinding[] = [
  {
    queue: Queue.AuthUserEvents,
    routingKeys: [RoutingKey.UserRegistered, RoutingKey.UserLoggedIn],
  },
  {
    queue: Queue.OrdersProductSync,
    routingKeys: [
      RoutingKey.ProductCreated,
      RoutingKey.ProductUpdated,
      RoutingKey.ProductStockChanged,
    ],
  },
  {
    queue: Queue.ProductOrderEvents,
    routingKeys: [RoutingKey.OrderCancelled],
  },
];

@Injectable()
export class RabbitPublisherService
  implements EventPublisher, OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(RabbitPublisherService.name);
  private connection!: AmqpConnectionManager;
  private channel!: ChannelWrapper;

  constructor(@Inject(MESSAGING_OPTIONS) private readonly options: MessagingOptions) {}

  async onApplicationBootstrap(): Promise<void> {
    this.connection = connect(this.options.url);
    this.channel = this.connection.createChannel({
      json: true,
      setup: async (ch: ConfirmChannel) => {
        await ch.assertExchange(EXCHANGE, 'topic', { durable: true });
        this.logger.log(`Connected to RabbitMQ: ${EXCHANGE} exchange ready`);
      },
    });
    await this.channel.waitForConnect();

    if (this.options.declareTopology) {
      await this.declareTopology();
    }
  }

  async onApplicationShutdown(): Promise<void> {
    await this.channel.close();
    await this.connection.close();
  }

  async publish<T extends object>(
    routingKey: string,
    payload: T,
    correlationId?: string,
  ): Promise<void> {
    const message = {
      ...payload,
      eventId: (payload as { eventId?: string }).eventId ?? uuidv4(),
      occurredAt: (payload as { occurredAt?: string }).occurredAt ?? new Date().toISOString(),
    };

    await this.channel.publish(EXCHANGE, routingKey, message, {
      persistent: true,
      contentType: 'application/json',
      headers: {
        'x-correlation-id': correlationId ?? uuidv4(),
      },
    });
  }

  private async declareTopology(): Promise<void> {
    await this.channel.addSetup(async (ch: ConfirmChannel) => {
      for (const binding of PHASE1_BINDINGS) {
        const dlxName = `dlx.${binding.queue}`;
        const dlqName = `dlq.${binding.queue}`;

        await ch.assertExchange(dlxName, 'direct', { durable: true });
        await ch.assertQueue(dlqName, { durable: true });
        await ch.bindQueue(dlqName, dlxName, binding.queue);

        await ch.assertQueue(binding.queue, {
          durable: true,
          arguments: {
            'x-dead-letter-exchange': dlxName,
            'x-dead-letter-routing-key': binding.queue,
          },
        });

        for (const rk of binding.routingKeys) {
          await ch.bindQueue(binding.queue, EXCHANGE, rk);
        }

        this.logger.log(
          `Declared queue ${binding.queue} with ${binding.routingKeys.length} binding(s)`,
        );
      }
    });
  }
}
