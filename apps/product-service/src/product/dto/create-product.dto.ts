import {
  IsString,
  IsOptional,
  MinLength,
  Matches,
  IsArray,
  IsUUID,
  IsInt,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Decimal string, e.g. "19.99"' })
  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/)
  price!: string;

  @ApiPropertyOptional({ default: 'USD' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  sku!: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  categoryIds?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  initialStock?: number;
}
