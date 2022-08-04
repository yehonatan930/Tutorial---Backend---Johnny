import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AADAuthGaurd } from './guards/authentication/aad-guard.guard';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
//import { ErrorsInterceptor } from './interceptors/serverErrors.interceptor';
import { HeadersInterceptor } from './interceptors/headers/headers.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['warn','error','log']
  });   //this line initiates the app
  //added authentication guard, more elaborate explanation will be in the readme in guards folder

  const configService = app.get(ConfigService);//access to dotenv through this configService

  app.enableCors({
    origin: [
      configService.get<string>('CLIENT_URL'),
      configService.get<string>('SERVER_URL'),
    ],
    credentials: true,
  });
  const reflector = app.get(Reflector);
  //app.useGlobalFilters(new HttpExceptionFilter)
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalGuards(
    new AADAuthGaurd(reflector));  //added interceptors which responsible for logging, for more info, look in the readme in interceptors folder
  //app.useGlobalInterceptors(new ErrorsInterceptor());
  app.useGlobalInterceptors(new HeadersInterceptor());
  app.use(cookieParser());//enable cookis
  app.use(csurf({ cookie: true }));//adds csrf protection
  //app initiation
  await app.listen(5216);
}
bootstrap();
