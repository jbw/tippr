import { createParamDecorator, ExecutionContext } from "@nestjs/common";

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

    const namespace = process.env.IDENTITY_AUDIENCE;
    const userid = request.user[`${namespace}/userid`];
    const orgs = request.user[`${namespace}/orgs`];

    const permissions = request.user.permissions;

    const user = new UserContext(userid, permissions, orgs);

    return user;
  },
);
