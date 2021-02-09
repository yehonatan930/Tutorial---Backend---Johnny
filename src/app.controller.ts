import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
/**
 * simple controller for example.
 * controller is reponsible for requests processing, any GET,POST and other requests,
 * are processed in a controller, the methodology is explained in the controller that are baked in the template.
 * in the @Contrller() brackets, any string may be written.
 * for example @Contrller('cats') add the /cats routing for the app url.
 * for example if the url is localhost:5216, that to access this controller requst,
 * the url localhost:5216/cats should be accessed
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * the @Get() decorator, means that the following method will be executed once the app url is accessed.
   * if @Get('getmethod') is written instead of @Get() and @Controller('cats') is written instead of @Controller()
   * before the class declaration, than localhost:5216/cats/getmethod will trigger the following method.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
