
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.guard';
import { Permission } from '../../../tippr.domain/permissions/permissions.enum';
import { PermissionsGuard } from './permissions.guard';

export const Authorize = (...permissions: Permission[]): (...args: any) => void => {
  return applyDecorators(
    SetMetadata('permissions', permissions),
    UseGuards(JwtAuthGuard, PermissionsGuard)
  );
};
