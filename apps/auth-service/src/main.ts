import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );

  app.setGlobalPrefix('');

  if (process.env['NODE_ENV'] !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('auth-service')
      .setVersion('1.0')
      .addApiKey({ type: 'apiKey', in: 'header', name: 'x-user-id' }, 'x-user-id')
      .addApiKey({ type: 'apiKey', in: 'header', name: 'x-user-roles' }, 'x-user-roles')
      .build();
    SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));
  }

  const port = process.env['PORT'] ?? 3001;
  await app.listen(port);
}

bootstrap();
