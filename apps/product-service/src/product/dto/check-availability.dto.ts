import { IsUUID, IsInt, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AvailabilityItemDto {
  @ApiProperty()
  @IsUUID('4')
  productId!: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CheckAvailabilityDto {
  @ApiProperty({ type: [AvailabilityItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AvailabilityItemDto)
  items!: AvailabilityItemDto[];
}
