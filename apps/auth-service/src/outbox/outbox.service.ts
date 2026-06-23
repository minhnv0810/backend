import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Inject } from '@nestjs/common';
import { EVENT_PUBLISHER, EventPublisher } from '@app/messaging';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OutboxService {
  private readonly logger = new Logger(OutboxService.name);
  private running = false;

  constructor(
    private readonly prisma: PrismaService,
    @Inject(EVENT_PUBLISHER) private readonly publisher: EventPublisher,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async relay(): Promise<void> {
    if (this.running) return;
    this.running = true;
    try {
      const rows = await this.prisma.outbox.findMany({
        where: { sent: false },
        orderBy: { createdAt: 'asc' },
        take: 50,
      });
      for (const row of rows) {
        try {
          await this.publisher.publish(row.routingKey, row.payload as object);
          await this.prisma.outbox.update({
            where: { id: row.id },
            data: { sent: true, sentAt: new Date() },
          });
        } catch (err) {
          this.logger.error({ msg: 'outbox relay failed', id: row.id, err });
        }
      }
    } finally {
      this.running = false;
    }
  }
}
