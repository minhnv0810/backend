import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { z } from 'zod';
import { validateConfig } from './validate';

@Module({})
export class AppConfigModule {
  static forRoot<T extends z.ZodTypeAny>(schema: T): DynamicModule {
    return {
      module: AppConfigModule,
      imports: [
        NestConfigModule.forRoot({
          isGlobal: true,
          validate: validateConfig(schema),
        }),
      ],
      exports: [NestConfigModule],
    };
  }
}
