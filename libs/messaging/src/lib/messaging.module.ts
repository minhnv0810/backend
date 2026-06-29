import { DynamicModule, Module } from '@nestjs/common';
import { RabbitPublisherService } from './rabbit-publisher.service';
import { EVENT_PUBLISHER } from './interfaces/event-publisher.interface';
import { MessagingOptions, MESSAGING_OPTIONS } from './messaging.options';

@Module({})
export class MessagingModule {
  static forRoot(options: MessagingOptions): DynamicModule {
    return {
      module: MessagingModule,
      providers: [
        { provide: MESSAGING_OPTIONS, useValue: options },
        RabbitPublisherService,
        { provide: EVENT_PUBLISHER, useExisting: RabbitPublisherService },
      ],
      exports: [EVENT_PUBLISHER, RabbitPublisherService, MESSAGING_OPTIONS],
      global: true,
    };
  }
}
