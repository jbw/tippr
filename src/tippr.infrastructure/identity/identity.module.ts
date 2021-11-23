import { Module } from "@nestjs/common";

import { IdentityConfigService } from "./identity.config";
import { JwtStrategy } from "./jwt/jwt.strategy";

@Module({
  providers: [JwtStrategy, IdentityConfigService],
  exports: [IdentityConfigService],
})
export class IdentityConfigModule {}
