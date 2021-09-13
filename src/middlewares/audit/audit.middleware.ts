import {
  Injectable,
  ExecutionContext,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { Audit } from './audit.model';
import { AuditService } from './audit.service';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private auditService: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    console.log('Audit invoked...');
    const req =  context.switchToHttp().getRequest();
    if (req.method !== 'GET') {
      const audit: Audit = new Audit();

      audit.operation = req.path;
      audit.entity = req.path;
      audit.payload = req.body;
      audit.timestamp = new Date();
      audit.user = req?.user?.preferred_username?.slice(0, 9) || 'PUBLIC'; // preferred_username is declared in runtime

      switch (req.method.toLowerCase()) {
        case 'post':
          audit.operation = 'create';
          break;
        case 'delete':
          audit.operation = 'delete';
          break;
        case 'put':
          audit.operation = 'update';
          break;
      }

      this.auditService.saveAudit(audit);
    }

    return next.handle().pipe(
      tap({
        complete: () => console.log(`Audit invoked completed successfully`),
        error: () => console.log(`Audit ivoked and error occured afterwards`),
      }),
    );
  }
}
