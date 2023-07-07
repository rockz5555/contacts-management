import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

const PORT = process.env.PORT || 9000;

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.enableCors({});

  await app.listen(PORT);
}

bootstrap().then(() => console.log(`\nBackend is running on port:`, PORT));
