import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const corsOrigins = config.get<string[]>('CORS_ORIGINS', []);

  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-correlation-id'],
    exposedHeaders: ['x-correlation-id'],
    credentials: true,
  });

  app.enableShutdownHooks();

  // SwaggerModule.setup must run before app.init() to register static asset routes.
  // We pass a minimal placeholder so NestJS registers /docs assets, then override
  // window.onload via customJsStr to load the real merged spec from /docs/json
  // (served by DocsController after DocsService.onModuleInit fetches all upstreams)
  const placeholder = SwaggerModule.createDocument(
    app,
    new DocumentBuilder().setTitle('Backend API').setVersion('1.0').build(),
  );
  SwaggerModule.setup('docs', app, placeholder, {
    customJsStr: `
      window.onload = function() {
        SwaggerUIBundle({
          url: '/docs/json',
          dom_id: '#swagger-ui',
          presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
          layout: 'StandaloneLayout',
          persistAuthorization: true,
          deepLinking: true,
        });
      };
    `,
  });

  const port = config.get<number>('PORT', 3000);
  await app.listen(port);
  Logger.log(`api-gateway running on http://localhost:${port}`);
  Logger.log(`Swagger UI: http://localhost:${port}/docs`);
}

bootstrap();
