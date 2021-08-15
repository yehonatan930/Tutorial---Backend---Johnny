import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CsrfCookieMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.cookie('csrf-token', req.csrfToken());
    next();
  }
}
