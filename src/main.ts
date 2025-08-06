import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const apiUrl = process.env.API_URL ?? 'http://localhost:3000';

  const config = new DocumentBuilder()
    .setTitle('Project Management API')
    .setDescription('API documentation for the Project Management Tool')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(apiUrl, 'Default server')
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalFilters(new PrismaClientExceptionFilter());

  const port = parseInt(process.env.PORT ?? '3000', 10);
  await app.listen(port);
}

void bootstrap();
