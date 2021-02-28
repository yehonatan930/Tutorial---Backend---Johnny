import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditMiddleware } from './audit.middleware';
import { Audit } from './audit.model';
import { AuditService } from './audit.service';

@Module({
  imports: [TypeOrmModule.forFeature([Audit])],
  providers: [AuditService, AuditMiddleware],
  exports: [AuditService, AuditMiddleware],
})
export class AuditModule {}
