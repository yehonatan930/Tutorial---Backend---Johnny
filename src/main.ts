import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AADAuthGaurd } from './authentication/aad-guard.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new AADAuthGaurd());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors();
  await app.listen(5216);
}
bootstrap();
