import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { ForwardedIdentityGuard } from './guards/forwarded-identity.guard';

export interface AuthModuleOptions {
  publicKey: string;
  issuer: string;
  audience: string;
}

@Module({})
export class AuthModule {
  static forRoot(options: AuthModuleOptions): DynamicModule {
    const jwtStrategy = new JwtStrategy(options.publicKey, options.issuer, options.audience);
    return {
      module: AuthModule,
      imports: [PassportModule, JwtModule.register({})],
      providers: [
        { provide: JwtStrategy, useValue: jwtStrategy },
        JwtAuthGuard,
        RolesGuard,
        ForwardedIdentityGuard,
      ],
      exports: [JwtAuthGuard, RolesGuard, ForwardedIdentityGuard, JwtModule],
      global: true,
    };
  }
}
