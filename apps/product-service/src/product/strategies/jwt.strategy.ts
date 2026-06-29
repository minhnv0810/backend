import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthenticatedUser } from '@app/auth';

interface JwtPayload {
  sub: string;
  email: string;
  roles: string[];
}

@Injectable()
export class LocalJwtStrategy extends PassportStrategy(Strategy, 'product-service-jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_PUBLIC_KEY'),
      algorithms: ['RS256'],
      issuer: config.get<string>('JWT_ISSUER', 'auth-service'),
      audience: config.get<string>('JWT_AUDIENCE', 'ecommerce-api'),
    });
  }

  validate(payload: JwtPayload): AuthenticatedUser {
    return {
      userId: payload.sub,
      email: payload.email,
      roles: payload.roles ?? [],
    };
  }
}
