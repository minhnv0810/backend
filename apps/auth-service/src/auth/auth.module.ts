import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { AuthJwtService } from '../jwt/jwt.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, AuthJwtService],
  exports: [AuthJwtService],
})
export class AuthModule {}
