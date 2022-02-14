import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

/**
 * this interceptor exists for security reasons.
 * you may read about each header in the internet.
 */
@Injectable()
export class HeadersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const res =  context.switchToHttp().getResponse();

    res.setHeader("x-powered-by","");
    res.setHeader("x-frame-options","SAMEORIGIN");
    res.setHeader("feature-policy","");
    res.setHeader("x-content-type-options","nosniff");
    res.setHeader("x-xss-protection","X-XSS-Protection: 1; mode=block");
    res.setHeader("content-security-policy","");
    res.setHeader("referrer-policy","");
    res.setHeader("strict-transport-security","strict-transport-security: max-age=31536000; includeSubDomains");
    return next.handle();
  }
}
