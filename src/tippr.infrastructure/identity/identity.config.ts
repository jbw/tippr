import { IdentityConfig } from "src/tippr.domain/identity.interface";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class IdentityConfigService implements IdentityConfig {

  constructor(private configService: ConfigService) { }

  getIdentityHost(): string {
    return this.configService.get<string>('IDENTITY_HOST');
  }
  getIdentityIssuer(): string {
    return this.configService.get<string>('IDENTITY_ISSUER');
  }
  getIdentityAudience(): string {
    return this.configService.get<string>('IDENTITY_AUDIENCE');
  }
  getIdentitySecret(): string {
    return this.configService.get<string>('IDENTITY_SECRET');
  }
  getIdentityJwkUri(): string {
    return this.configService.get<string>('IDENTITY_JWK_URI');
  }
}
