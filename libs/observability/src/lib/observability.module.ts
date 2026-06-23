import { MiddlewareConsumer, Module, NestModule, DynamicModule } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { CorrelationIdMiddleware } from './correlation-id.middleware';
import { HealthModule } from './health/health.module';
import { buildLoggerConfig } from './logger.config';

@Module({})
export class ObservabilityModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }

  static forRoot(serviceName: string): DynamicModule {
    return {
      module: ObservabilityModule,
      imports: [LoggerModule.forRoot(buildLoggerConfig(serviceName)), HealthModule],
    };
  }
}
