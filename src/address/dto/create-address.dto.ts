import { IsString, Matches } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  id: string;

  @IsString()
  @Matches(/^\d{8}$/)
  cep: string;

  @IsString()
  street: string;

  @IsString()
  neighborhood: string;

  @IsString()
  city: string;
}
