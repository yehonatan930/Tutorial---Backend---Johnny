import { AuditInterceptor } from './middlewares/audit/audit.middleware';
import { AuditModule } from './middlewares/audit/audit.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemplateModule } from './templates/template.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AADStrategy } from './guards/authentication/aad.strategy';
import { HealthModule } from './health/health.module';
import { CsrfCookieMiddleware } from './middlewares/csrf.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), //this import is resolving all the .env params, MUST be done first.
    TypeormModule, //this import get the typeorm configuration, should be before the other modules.
    TemplateModule, //simple Template for example.
    AuditModule,
    HealthModule,
  ],
  controllers: [AppController], //built-in controller.
  providers: [
    AppService, //buildt-in service
    AADStrategy, //the strategy for the authentication, this part is responsible for azure authentication.
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumere: MiddlewareConsumer) {
    //logger middleware that is executed for each request before its designated function.
    consumere.apply(LoggerMiddleware).forRoutes('/');
    consumere
      .apply(CsrfCookieMiddleware)
      .forRoutes('/');
  }
}
