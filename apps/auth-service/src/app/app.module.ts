import { Module } from '@nestjs/common';
import { AppConfigModule, AuthServiceSchema } from '@app/config';
import { ObservabilityModule } from '@app/observability';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AppConfigModule.forRoot(AuthServiceSchema),
    ObservabilityModule.forRoot('auth-service'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
