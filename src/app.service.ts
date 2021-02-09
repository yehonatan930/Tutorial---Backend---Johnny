import { Injectable } from '@nestjs/common';
/**
 * this is a service for example, usually a service is present to process things from the upper layer from the controller
 * usually, a service is processing the requests and is accessing the db.
 * it is up to the programmer, if wants to add a database layer.
 */
@Injectable()
export class AppService {
  /**
   * simple hello world request, just return the hello world back.
   */
  getHello(): string {
    return 'Hello World!';
  }
}
