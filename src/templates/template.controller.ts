import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  // UsePipes,
} from '@nestjs/common';
// import Joi from 'joi';
// import { JoiValidationPipe } from '../pipes/validationPipe';
import { TemplateService } from './template.service';

@Controller('template')
export class TemplateController {
  constructor(private readonly templatesService: TemplateService) {}

  @Post()
  // @UsePipes(
  //   new JoiValidationPipe(
  //     Joi.object().keys({
  //       TemplateArg1: Joi.string().max(20),
  //       TemplateArg2: Joi.string().max(20),
  //     }),
  //   ),
  // )
  addTemplate(
    @Body('TemplateArg1') TemplateArg1: string,
    @Body('TemplateArg2') TemplateArg2: string,
  ): any {
    const generatedID = this.templatesService.insertTemplate(
      TemplateArg1,
      TemplateArg2,
    );
    return {
      id: generatedID,
    };
  }

  @Patch(':id')
  updateTemplate(
    @Body('TemplateArg1') TemplateArg1: string,
    @Body('TemplateArg2') TemplateArg2: string,
    @Param('id', ParseIntPipe) templateID: string,
  ): any {
    this.templatesService.updateTemplate(
      templateID,
      TemplateArg1,
      TemplateArg2,
    );
    return null;
  }

  @Get()
  getAllTemplates() {
    return this.templatesService.getAllTemplates();
  }

  @Get(':id')
  getTemplate(@Param('id', ParseIntPipe) templateID: string) {
    return this.templatesService.getTemplate(templateID);
  }
}
