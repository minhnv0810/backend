import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CancelOrderDto {
  @ApiPropertyOptional({ example: 'Changed my mind' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
