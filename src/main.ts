import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AADAuthGaurd } from './guards/authentication/aad-guard.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //this line initiates the app
  app.useGlobalGuards(new AADAuthGaurd()); //added authentication guard, more elaborate explanation will ve in the guards folder
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors();
  await app.listen(5216);
}
bootstrap();
