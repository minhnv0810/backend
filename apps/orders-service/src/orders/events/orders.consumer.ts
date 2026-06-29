import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  Logger,
  Inject,
} from '@nestjs/common';
import { connect, AmqpConnectionManager, ChannelWrapper } from 'amqp-connection-manager';
import { ConsumeMessage, ConfirmChannel } from 'amqplib';
import {
  Queue,
  RoutingKey,
  ProductCreatedV1,
  ProductUpdatedV1,
  ProductStockChangedV1,
} from '@app/contracts';
import { MESSAGING_OPTIONS, MessagingOptions } from '@app/messaging';
import { OrdersRepository } from '../orders.repository';

@Injectable()
export class OrdersConsumer implements OnApplicationBootstrap, OnApplicationShutdown {
  private readonly logger = new Logger(OrdersConsumer.name);
  private connection!: AmqpConnectionManager;
  private channel!: ChannelWrapper;

  constructor(
    @Inject(MESSAGING_OPTIONS) private readonly options: MessagingOptions,
    private readonly repo: OrdersRepository,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    this.connection = connect(this.options.url);
    this.channel = this.connection.createChannel({
      json: true,
      setup: async (ch: ConfirmChannel) => {
        await ch.assertQueue(Queue.OrdersProductSync, {
          durable: true,
          arguments: {
            'x-dead-letter-exchange': `dlx.${Queue.OrdersProductSync}`,
            'x-dead-letter-routing-key': Queue.OrdersProductSync,
          },
        });
        await ch.prefetch(10);
        await ch.consume(Queue.OrdersProductSync, (msg) => this.handleMessage(ch, msg));
        this.logger.log(`Listening on queue: ${Queue.OrdersProductSync}`);
      },
    });
    await this.channel.waitForConnect();
  }

  async onApplicationShutdown(): Promise<void> {
    await this.channel.close();
    await this.connection.close();
  }

  private async handleMessage(ch: ConfirmChannel, msg: ConsumeMessage | null): Promise<void> {
    if (!msg) return;

    let payload: ProductCreatedV1 | ProductUpdatedV1 | ProductStockChangedV1;
    try {
      payload = JSON.parse(msg.content.toString());
    } catch {
      this.logger.error('Failed to parse message — discarding');
      ch.nack(msg, false, false);
      return;
    }

    try {
      const already = await this.repo.isEventProcessed(payload.eventId);
      if (already) {
        ch.ack(msg);
        return;
      }

      const rk = msg.fields.routingKey;

      if (rk === RoutingKey.ProductCreated || rk === RoutingKey.ProductUpdated) {
        const p = payload as ProductCreatedV1 | ProductUpdatedV1;
        await this.repo.upsertProductSnapshot({
          productId: p.productId,
          name: p.name,
          price: p.price,
          currency: p.currency,
          ...('stock' in p && { stockView: (p as ProductCreatedV1).stock }),
        });
      } else if (rk === RoutingKey.ProductStockChanged) {
        const p = payload as ProductStockChangedV1;
        await this.repo.updateSnapshotStock(p.productId, p.newQty);
      }

      await this.repo.markEventProcessed(payload.eventId);
      ch.ack(msg);
    } catch (err) {
      this.logger.error({
        msg: 'Failed to process product event',
        routingKey: msg.fields.routingKey,
        err,
      });
      ch.nack(msg, false, false);
    }
  }
}
