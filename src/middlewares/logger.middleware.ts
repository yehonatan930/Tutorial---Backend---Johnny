import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as appInsights from 'applicationinsights';
/**
 * a middleware is an entity that sits between a route, and a function that is connected to that route.
 * in this case, this logger is applied gloabally in the app.module.ts, this simple middleware will print
 * the url of the request.
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {
    appInsights
      .setup() //automatic takes from env when empty
      .setAutoCollectExceptions(true)
      .setAutoCollectRequests(true)
      .start();
  }

  use(req: Request, res: Response, next: NextFunction) {
    console.log('Logger - Request was made to ', req.url);
    appInsights.defaultClient.trackNodeHttpRequest({
      request: req,
      response: res,
    });
    next();
  }
}
