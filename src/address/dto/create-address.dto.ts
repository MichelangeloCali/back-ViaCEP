import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty()
  @IsString()
  @Matches(/^\d{8}$/)
  postalCode: string;

  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsString()
  neighborhood: string;

  @ApiProperty()
  @IsString()
  city: string;
}
