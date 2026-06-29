import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  Logger,
  Inject,
} from '@nestjs/common';
import { connect, AmqpConnectionManager, ChannelWrapper } from 'amqp-connection-manager';
import { ConsumeMessage, ConfirmChannel } from 'amqplib';
import { Queue, RoutingKey, OrderCancelledV1 } from '@app/contracts';
import { MESSAGING_OPTIONS, MessagingOptions } from '@app/messaging';
import { ProductService } from '../product/product.service';

interface OrderCancelledWithItems extends OrderCancelledV1 {
  items?: { productId: string; quantity: number }[];
}

@Injectable()
export class OrderEventsConsumer implements OnApplicationBootstrap, OnApplicationShutdown {
  private readonly logger = new Logger(OrderEventsConsumer.name);
  private connection!: AmqpConnectionManager;
  private channel!: ChannelWrapper;

  constructor(
    @Inject(MESSAGING_OPTIONS) private readonly options: MessagingOptions,
    private readonly productService: ProductService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    this.connection = connect(this.options.url);
    this.channel = this.connection.createChannel({
      json: true,
      setup: async (ch: ConfirmChannel) => {
        await ch.prefetch(10);
        await ch.consume(Queue.ProductOrderEvents, (msg) => this.handleMessage(ch, msg));
        this.logger.log(`Listening on queue: ${Queue.ProductOrderEvents}`);
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

    try {
      const payload = JSON.parse(msg.content.toString()) as OrderCancelledWithItems;

      if (msg.fields.routingKey === RoutingKey.OrderCancelled) {
        await this.productService.handleOrderCancelled(payload);
      }

      ch.ack(msg);
    } catch (err) {
      this.logger.error({ msg: 'Failed to process message', routingKey: msg.fields.routingKey, err });
      ch.nack(msg, false, false);
    }
  }
}
