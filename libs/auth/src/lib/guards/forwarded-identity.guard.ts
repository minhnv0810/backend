import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedUser } from '../types/authenticated-user.type';

@Injectable()
export class ForwardedIdentityGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context
      .switchToHttp()
      .getRequest<Request & { user: AuthenticatedUser }>();
    const userId = req.headers['x-user-id'] as string | undefined;
    const roles = req.headers['x-user-roles'] as string | undefined;

    if (!userId) throw new UnauthorizedException('Missing x-user-id header');

    req.user = {
      userId,
      email: '',
      roles: roles ? roles.split(',').map((r) => r.trim()) : [],
    };
    return true;
  }
}
