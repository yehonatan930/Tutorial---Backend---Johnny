import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AADAuthGaurd } from './guards/authentication/aad-guard.guard';
async function bootstrap() {
  const app = await NestFactory.create(AppModule); //this line initiates the app
  //added authentication guard, more elaborate explanation will be in the readme in guards folder

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AADAuthGaurd(reflector));  //added interceptors which responsible for logging, for more info, look in the readme in interceptors folder
  app.useGlobalInterceptors(new LoggingInterceptor());
  //Cross-Origin-resource-sharing must be enabled so that the frontend will be able to ask resourced from the backend
  app.enableCors();
  //app initiation
  await app.listen(5216);
}
bootstrap();
