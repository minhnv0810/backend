import { Controller, Get, Post, Res, HttpCode } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { Response } from 'express';
import { Public } from '../auth/decorators/public.decorator';
import { DocsService } from './docs.service';

@Controller('docs')
@Public()
@SkipThrottle()
export class DocsController {
  constructor(private readonly docs: DocsService) {}

  @Get('json')
  getJson(@Res() res: Response) {
    const spec = this.docs.getSpec();
    if (!spec) {
      return res.status(503).json({ error: { code: 'DOCS_UNAVAILABLE', message: 'Docs not yet ready' } });
    }
    return res.json(spec);
  }

  @Post('refresh')
  @HttpCode(204)
  async refresh() {
    await this.docs.refresh();
  }
}
