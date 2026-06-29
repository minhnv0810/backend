import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import { RolesGuard, Roles, CurrentUser } from '@app/auth';
import { AuthenticatedUser } from '@app/auth';
import { JwtGuard } from './guards/jwt.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201 })
  async register(@Body() dto: RegisterDto, @Req() req: Request) {
    const correlationId = req.headers['x-correlation-id'] as string ?? '';
    const data = await this.authService.register(dto, correlationId);
    return { data, meta: { correlationId } };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login' })
  async login(@Body() dto: LoginDto, @Req() req: Request) {
    const correlationId = req.headers['x-correlation-id'] as string ?? '';
    const data = await this.authService.login(
      dto,
      req.headers['user-agent'],
      req.ip,
    );
    return { data, meta: { correlationId } };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh token pair' })
  async refresh(@Body() dto: RefreshDto, @Req() req: Request) {
    const correlationId = req.headers['x-correlation-id'] as string ?? '';
    const data = await this.authService.refresh(dto);
    return { data, meta: { correlationId } };
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Logout (revoke refresh token)' })
  @ApiBearerAuth()
  async logout(@Body() dto: RefreshDto) {
    await this.authService.logout(dto.refreshToken);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get authenticated user' })
  @ApiBearerAuth()
  async me(@CurrentUser() user: AuthenticatedUser, @Req() req: Request) {
    const correlationId = req.headers['x-correlation-id'] as string ?? '';
    const data = await this.authService.getMe(user.userId);
    return { data, meta: { correlationId } };
  }

  @Post('users/:id/roles')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Assign roles to user (admin)' })
  @ApiBearerAuth()
  async updateRoles(
    @Param('id') id: string,
    @Body() dto: UpdateRolesDto,
    @Req() req: Request,
  ) {
    const correlationId = req.headers['x-correlation-id'] as string ?? '';
    const data = await this.authService.updateRoles(id, dto.roles);
    return { data, meta: { correlationId } };
  }
}
