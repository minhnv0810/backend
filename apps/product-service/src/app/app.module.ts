import { Module } from '@nestjs/common';
import { AppConfigModule, ProductServiceSchema } from '@app/config';
import { ObservabilityModule } from '@app/observability';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AppConfigModule.forRoot(ProductServiceSchema),
    ObservabilityModule.forRoot('product-service'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
