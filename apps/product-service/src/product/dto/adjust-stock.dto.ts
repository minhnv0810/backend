import { IsOptional, IsInt, Min, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AdjustStockDto {
  @ApiPropertyOptional({ description: 'Relative adjustment (positive or negative)' })
  @IsOptional()
  @IsInt()
  delta?: number;

  @ApiPropertyOptional({ description: 'Set quantity to an absolute value' })
  @IsOptional()
  @IsInt()
  @Min(0)
  set?: number;

  @ApiProperty()
  @IsString()
  reason!: string;
}
