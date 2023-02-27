/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  setupSwagger(app);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

function setupSwagger(app:INestApplication) {
  const config = new DocumentBuilder()
  .setTitle("myToDoApp")
  .setVersion("1.0")
  .addServer("http://localhost:3333","Localhost")
  .addBearerAuth()
  .build();

  const options = {customSiteTitle:"My ToDo App", swaggerOptions:{docExpansion:"list"}}
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, options);
}