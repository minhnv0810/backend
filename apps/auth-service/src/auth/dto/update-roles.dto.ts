import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRolesDto {
  @ApiProperty({ example: ['customer', 'admin'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  roles!: string[];
}
