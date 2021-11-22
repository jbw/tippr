import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '../../../tippr.domain/permissions/permissions.enum';

const PERMISSIONS_KEY = "permissions";
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {

    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions) return true;
    
    const { user } = context.switchToHttp().getRequest();

    if(!user) return false;

    return requiredPermissions.some((permission) => user.permissions?.includes(permission));
  }

}