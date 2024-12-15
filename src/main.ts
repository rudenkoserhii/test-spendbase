import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    // { logger: console }
    // { logger: ['error', 'warn'] }
  );

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  app.enableCors();

  await app.listen(process.env.APP_PORT ?? 3000);
  Logger.log(`Application is running on: http://localhost:${process.env.APP_PORT ?? 3000}`);
}

bootstrap();
