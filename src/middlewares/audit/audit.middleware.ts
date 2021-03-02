import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Audit } from './audit.model';
import { AuditService } from './audit.service';

@Injectable()
export class AuditMiddleware implements NestMiddleware {
  constructor(private auditService: AuditService) {}

  use(req: Request, _res: Response, next: NextFunction) {
    console.log('Audit invoked...');
    const audit: Audit = new Audit();

    audit.operation = req.path;
    audit.entity = req.path;
    audit.payload = req.body;
    audit.timestamp = new Date();
    audit.user = 'Eden';

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

    next();
  }
}
