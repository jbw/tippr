import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { IdentityConfigService } from '../identity.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(config: IdentityConfigService) {

    const opts = {
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: config.getIdentityJwkUri(),
      }),
      issuer: config.getIdentityIssuer(),
      audience: config.getIdentityAudience(),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['RS256'],
    };

    super(opts);
  }

  async validate(payload: any) {
    return { ...payload };
  }
}
