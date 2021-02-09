import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
//import { Reflector } from '@nestjs/core';
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request: any): boolean {
    if (request) return true;
  }
}
