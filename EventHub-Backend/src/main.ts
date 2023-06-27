import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { FallbackExceptionFilter } from './core/filters/fallback.filter';
import { HttpExceptionFilter } from './core/filters/http.filter';

async function bootstrap() {
  config();

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter()
  );

  await app.listen(5000);
}
bootstrap();
