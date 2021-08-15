import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err =>{
          console.log(err);
          return throwError(new InternalServerErrorException("something went wrong","the server could not reposnd correctly"));
        } ),
      );
  }
}