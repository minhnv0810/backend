import { JwtService } from '@nestjs/jwt';
import { generateKeyPairSync } from 'crypto';

export interface TestKeyPair {
  privateKey: string;
  publicKey: string;
}

export function generateTestKeyPair(): TestKeyPair {
  const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  });
  return { privateKey, publicKey };
}

export interface MintTokenOptions {
  userId: string;
  email: string;
  roles: string[];
  issuer?: string;
  audience?: string;
  expiresIn?: string;
}

export function mintTestJwt(privateKey: string, options: MintTokenOptions): string {
  const jwtService = new JwtService({
    privateKey,
    signOptions: {
      algorithm: 'RS256',
      issuer: options.issuer ?? 'auth-service',
      audience: options.audience ?? 'ecommerce-api',
      expiresIn: options.expiresIn ?? '15m',
    },
  });

  return jwtService.sign({
    sub: options.userId,
    email: options.email,
    roles: options.roles,
  });
}
