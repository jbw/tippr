import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { Permission } from "../../domain/permissions/permissions.enum";

export class UserContext {
  constructor(
    public readonly userid: string,
    public readonly permissions: string[],
    public readonly orgs: string[],
  ) {}
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const userid = request.user['http://jasons-burger-shop.com/userid'];
    const orgs = request.user['http://jasons-burger-shop.com/orgs'];
    const permissions = request.user.permissions;

    const user = new UserContext(userid, permissions, orgs);

    return user;
  },
);
