import { Controller, Get, Param } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':cep')
  findAddress(@Param('cep') cep: string) {
    return this.addressService.findAddress(cep);
  }
}
