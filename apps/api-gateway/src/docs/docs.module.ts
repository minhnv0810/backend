import { Module } from '@nestjs/common';
import { DocsService } from './docs.service';
import { DocsController } from './docs.controller';

@Module({
  providers: [DocsService],
  controllers: [DocsController],
})
export class DocsModule {}
