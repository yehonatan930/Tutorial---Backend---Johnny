import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard that uses the strategy we made, for more details go to './aad.strategy.ts'
 */
@Injectable()
export class AADAuthGaurd extends AuthGuard('azure-auth-bearer') {}
