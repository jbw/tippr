
import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";

import { Permission } from "../../../tippr.domain/permissions/permissions.enum";
import { JwtAuthGuard } from "./jwt.guard";
import { PermissionsGuard } from "./permissions.guard";

export const Authorize = (...permissions: Permission[]): (...args: any) => void => {
  return applyDecorators(
    SetMetadata('permissions', permissions),
    UseGuards(JwtAuthGuard, PermissionsGuard)
  );
};
