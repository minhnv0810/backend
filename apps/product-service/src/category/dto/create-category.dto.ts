import { IsString, MinLength, Matches, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  name!: string;

  @ApiProperty({ description: 'URL-friendly slug, e.g. "electronics"' })
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID('4')
  parentId?: string;
}
