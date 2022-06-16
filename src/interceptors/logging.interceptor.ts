import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * interceptors wrap up things, they can wrap up a function, a controller or even the whole app itself.
 * the interceptor 'intercepts' the requests for the function (or app or controller) and can execute some things
 * before and after the 'next' is handled.
 * here is a example for logging interceptor.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  /**
   *
   * @param _context object with info about the request
   * @param next for this example, after the interceptor logged anything it wanted, next.handle() must be called.
   * any function that needed to be executed after the requestis done, is called via next.handle().pipe(<function>)
   */
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...'); //the thing that happens before
    //if you want to get the request object, use _context.switchToHttp().getRequest()
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap({ complete: () => console.log(`After... ${Date.now() - now}ms`) ,error:(err)=>console.log(err)}),
      ); //the complete field contains the function to be executed after.
  }
}
