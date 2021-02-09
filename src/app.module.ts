import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemplateModule } from './templates/template.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AADStrategy } from './guards/authentication/aad.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModule,
    TemplateModule,
  ],
  controllers: [AppController],
  providers: [AppService, AADStrategy],
})
export class AppModule implements NestModule {
  configure(consumere: MiddlewareConsumer) {
    consumere.apply(LoggerMiddleware).forRoutes('/');
  }
}
