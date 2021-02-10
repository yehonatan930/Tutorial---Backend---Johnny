import { TemplateEntity } from './template.model';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
/**
 * this class represent a template module which is responsible for everything around the Template Entity.
 */
@Module({
  //this is needed so the repository could be injected, for more details look in ./template.service.ts
  imports: [TypeOrmModule.forFeature([TemplateEntity])],
  //the controller of thiis module must be imported here.
  controllers: [TemplateController],
  //any injectable must be imported here.
  providers: [TemplateService],
})
export class TemplateModule {}
