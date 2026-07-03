import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

@Injectable()
export class AuthJwtService {
  private readonly accessTtl: number;
  private readonly refreshTtl: number;
  private readonly audience: string;
  private readonly issuer: string;

  private readonly privateKey: string;
  private readonly publicKey: string;

  constructor(
    private readonly jwt: NestJwtService,
    private readonly config: ConfigService,
  ) {
    this.accessTtl = this.config.get<number>('JWT_ACCESS_TOKEN_TTL', 900);
    this.refreshTtl = this.config.get<number>('JWT_REFRESH_TOKEN_TTL', 604800);
    this.audience = this.config.get<string>('JWT_AUDIENCE', 'ecommerce-api');
    this.issuer = this.config.get<string>('JWT_ISSUER', 'auth-service');
    this.privateKey = this.config.getOrThrow<string>('JWT_PRIVATE_KEY').replace(/\\n/g, '\n');
    this.publicKey = this.config.getOrThrow<string>('JWT_PUBLIC_KEY').replace(/\\n/g, '\n');
  }

  signAccess(payload: { sub: string; email: string; roles: string[] }): string {
    return this.jwt.sign(
      { ...payload, jti: uuidv4() },
      {
        privateKey: this.privateKey,
        algorithm: 'RS256',
        expiresIn: this.accessTtl,
        audience: this.audience,
        issuer: this.issuer,
      },
    );
  }

  signRefresh(payload: { sub: string; familyId: string }): string {
    return this.jwt.sign(
      { ...payload, jti: uuidv4() },
      {
        privateKey: this.privateKey,
        algorithm: 'RS256',
        expiresIn: this.refreshTtl,
        audience: this.audience,
        issuer: this.issuer,
      },
    );
  }

  verify<T extends object>(token: string): T {
    return this.jwt.verify<T>(token, {
      publicKey: this.publicKey,
      algorithms: ['RS256'],
      audience: this.audience,
      issuer: this.issuer,
    });
  }

  getAccessTtl(): number {
    return this.accessTtl;
  }

  getRefreshTtlMs(): number {
    return this.refreshTtl * 1000;
  }
}
