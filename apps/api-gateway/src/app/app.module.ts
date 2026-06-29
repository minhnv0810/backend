import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppConfigModule, GatewaySchema } from '@app/config';
import { AuthModule, RolesGuard } from '@app/auth';
import { ObservabilityModule } from '@app/observability';
import { GatewayJwtGuard } from '../auth/jwt.guard';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { ProxyModule } from '../proxy/proxy.module';

@Module({
  imports: [
    AppConfigModule.forRoot(GatewaySchema),
    ObservabilityModule.forRoot('api-gateway'),
    AuthModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        publicKey: config.getOrThrow<string>('JWT_PUBLIC_KEY').replace(/\\n/g, '\n'),
        issuer: config.getOrThrow<string>('JWT_ISSUER'),
        audience: config.getOrThrow<string>('JWT_AUDIENCE'),
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            name: 'global',
            ttl: config.get<number>('THROTTLE_GLOBAL_TTL_MS', 60_000),
            limit: config.get<number>('THROTTLE_GLOBAL_LIMIT', 100),
          },
          {
            name: 'auth',
            ttl: config.get<number>('THROTTLE_AUTH_TTL_MS', 60_000),
            limit: config.get<number>('THROTTLE_AUTH_LIMIT', 10),
          },
        ],
      }),
      inject: [ConfigService],
    }),
    ProxyModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: GatewayJwtGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
