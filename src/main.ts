import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ROUTES } from 'consts/routes.enum';

const DEFAULT_PORT = 3000;

dotenv.config();

async function bootstrap() {
  const port = process.env.APP_PORT || DEFAULT_PORT;

  const app = await NestFactory.create(
    AppModule,
    { cors: true },
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('spendbase test')
    .setDescription('spendbase test')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(ROUTES.SWAGGER, app, document);

  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
