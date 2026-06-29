import { Controller, All, Get, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { Request, Response } from 'express';
import { Roles } from '@app/auth';
import { Public } from '../auth/decorators/public.decorator';
import { ProxyService } from './proxy.service';

@Controller()
@SkipThrottle({ auth: true })
export class ProxyController {
  constructor(private readonly proxy: ProxyService) {}

  // ─── Auth service ───────────────────────────────────────────────────

  @Post('auth/register')
  @Public()
  @SkipThrottle({ global: true })
  @Throttle({ auth: {} })
  register(@Req() req: Request, @Res() res: Response) {
    return this.proxy.forward(req, res, 'auth');
  }

  @Post('auth/login')
  @Public()
  @SkipThrottle({ global: true })
  @Throttle({ auth: {} })
  login(@Req() req: Request, @Res() res: Response) {
    return this.proxy.forward(req, res, 'auth');
  }

  @Post('auth/refresh')
  @Public()
  @SkipThrottle({ global: true })
  @Throttle({ auth: {} })
  refresh(@Req() req: Request, @Res() res: Response) {
    return this.proxy.forward(req, res, 'auth');
  }

  @All('auth/*path')
  @SkipThrottle({ global: true })
  @Throttle({ auth: {} })
  authRoutes(@Req() req: Request, @Res() res: Response) {
    return this.proxy.forward(req, res, 'auth');
  }

  // ─── Product service ─────────────────────────────────────────────────

  @Get('products')
  @Public()
  listProducts(@Req() req: Request, @Res() res: Response) {
    return this.proxy.forward(req, res, 'product');
  }

  @Get('products/:id')
  @Public()
  getProduct(@Req() req: Request, @Res() res: Response) {
    return this.proxy.forward(req, res, 'product');
  }

  @Post('products')
  @Roles('admin')
  createProduct(@Req() req: Request, @Res() res: Response) {
    return this.proxy.forward(req, res, 'product');
  }

  @Put('products/:id')
  @Roles('admin')
  updateProduct(@Req() req: Request, @Res() res: Response) {
    return this.proxy.forward(req, res, 'product');
  }

  @Delete('products/:id')
  @Roles('admin')
  deleteProduct(@Req() req: Request, @Res() res: Response) {
    return this.proxy.forward(req, res, 'product');
  }

  @Post('products/:id/stock')
  @Roles('admin')
  updateStock(@Req() req: Request, @Res() res: Response) {
    return this.proxy.forward(req, res, 'product');
  }

  @All('products/*path')
  productRoutes(@Req() req: Request, @Res() res: Response) {
    return this.proxy.forward(req, res, 'product');
  }

  // ─── Orders service ───────────────────────────────────────────────────

  @All('orders')
  ordersList(@Req() req: Request, @Res() res: Response) {
    return this.proxy.forward(req, res, 'orders');
  }

  @All('orders/*path')
  orderRoutes(@Req() req: Request, @Res() res: Response) {
    return this.proxy.forward(req, res, 'orders');
  }
}
