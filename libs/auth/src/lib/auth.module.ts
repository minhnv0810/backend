import { DynamicModule, FactoryProvider, Module, ModuleMetadata } from '@nestjs/common';
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

export interface AuthModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFactory: (...args: any[]) => AuthModuleOptions | Promise<AuthModuleOptions>;
  inject?: FactoryProvider['inject'];
}

const AUTH_OPTIONS = 'AUTH_MODULE_OPTIONS';

function buildProviders() {
  return [
    {
      provide: JwtStrategy,
      useFactory: (opts: AuthModuleOptions) =>
        new JwtStrategy(opts.publicKey, opts.issuer, opts.audience),
      inject: [AUTH_OPTIONS],
    },
    JwtAuthGuard,
    RolesGuard,
    ForwardedIdentityGuard,
  ];
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

  static forRootAsync(options: AuthModuleAsyncOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [...(options.imports ?? []), PassportModule, JwtModule.register({})],
      providers: [
        {
          provide: AUTH_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject ?? [],
        },
        ...buildProviders(),
      ],
      exports: [JwtAuthGuard, RolesGuard, ForwardedIdentityGuard, JwtModule],
      global: true,
    };
  }
}
