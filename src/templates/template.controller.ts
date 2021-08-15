import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import * as Joi from 'joi';
import { JoiValidationPipe } from '../pipes/validationPipe';
import { TemplateService } from './template.service';
/**
 * this class represents a template controller.
 * a controller is reponsible for receiving incoming requests.
 * any controller must be annotated with the @Controller() decorator.
 * if a contoller is responsible for a more specific route than just '/'
 * than the a string needs to be written in the decorator likewise @Controller(template)
 * where template is the route, so if for example, if the url is localhost:5216,
 * the controller functions can be accesses through localhost:5216/template
 */
@Controller('template')
export class TemplateController {
  //dependency injection,the TemplateService will be injected here by NestJS, for more information look in ./template.srvice.ts
  constructor(private readonly templatesService: TemplateService) {}

  /**
   * each function is trigger in accordance to the Http request type, so to create a Post request
   * @Post() must be written before the function. for a Get request @Get() and so on.
   * @param TemplateArg1 the request body must be a json with a field named TemplateArg1
   * @param TemplateArg2 the request body must be a json with a field named TemplateArg2
   */
  @Post()
  // @UsePipes(
  //   // pipes add a layer of validation/transformation to the data coming from the request
  //   // in this example the pipe validates that the data is in specific structure of the the Template
  //   // object.
  //   new JoiValidationPipe(
  //     Joi.object().keys({
  //       TemplateArg1: Joi.string().max(20),
  //       TemplateArg2: Joi.string().max(20),
  //     }),
  //   ),
  // )
  addTemplate(
    @Body('TemplateArg1') TemplateArg1: string, //this is how the body parameters are accessed
    @Body('TemplateArg2') TemplateArg2: string, // similiarly there is @Query() and @Params()
  ): any {
    const generatedID = this.templatesService.insertTemplate(
      TemplateArg1,
      TemplateArg2,
    );
    return {
      id: generatedID,
    };
  }

  /**
   * this function is an example for specific routing for the function.
   * if the url is localhost:5216, and the controller's decorator is @Controller('template')
   * this function will be triggered upon Patch request to localhost5216/template/id
   * where id can be any a number because of the validation type passed to it 'ParseIntPipe',
   * but in genereal any string may be an ID.
   * @param TemplateArg1
   * @param TemplateArg2
   * @param templateID
   */
  @Patch(':id')
  updateTemplate(
    @Body('TemplateArg1') TemplateArg1: string, //this is how the body parameters are accessed
    @Body('TemplateArg2') TemplateArg2: string, // similiarly there is @Query() and @Params()
    @Param('id', ParseIntPipe) templateID: string, //for example - the parameter id from the url is
    // accessed throught the @Params Decorator with the name id.
  ): any {
    this.templatesService.updateTemplate(
      templateID,
      TemplateArg1,
      TemplateArg2,
    );
    return null;
  }

  /**
   * simple Get() decorator, a simple call to localhost:5216/template will trigger this function.
   */
  @Get()
  getAllTemplates() {
    const templates=  this.templatesService.getAllTemplates()
    return templates;
  }
  /**
   * another example if parameter routing.
   * @param templateID the ID of the templated requested.
   */
  @Get(':id')
  getTemplate(@Param('id', ParseIntPipe) templateID: string) {
    return this.templatesService.getTemplate(templateID);
  }
}
