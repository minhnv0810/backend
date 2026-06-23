import { Module } from '@nestjs/common';
import { AppConfigModule, GatewaySchema } from '@app/config';
import { ObservabilityModule } from '@app/observability';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AppConfigModule.forRoot(GatewaySchema),
    ObservabilityModule.forRoot('api-gateway'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
