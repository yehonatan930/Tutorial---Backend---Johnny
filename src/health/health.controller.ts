import { Controller, Get } from '@nestjs/common';
import { Public } from '../guards/authentication/types/authorizationTypes';


@Controller()
export class HealthController {
  constructor() {}

  @Public()
  @Get()
  HealthCheck() {
    console.log("health Check")
    return "succussful health check";
  }
}
