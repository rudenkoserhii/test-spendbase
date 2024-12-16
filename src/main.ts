import * as dotenv from 'dotenv';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from 'app/app.module';
import { ROUTES, MESSAGES } from 'consts';
import pkg from '../package.json';

const DEFAULT_PORT = 3000;
const DEFAULT_HOST = 'localhost';
const DEFAULT_PROTOCOL = 'http';

dotenv.config();

async function bootstrap() {
  const port = process.env.PORT || DEFAULT_PORT;
  const host = process.env.HOST || DEFAULT_HOST;
  const protocol = process.env.PROTOCOL || DEFAULT_PROTOCOL;

  const { name, version, description } = pkg || {};

  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(ROUTES.SWAGGER, app, document);

  await app.listen(port);
  Logger.log(`${MESSAGES.SERVER_RUNS}${protocol}://${host}:${port}`);
}

bootstrap();
