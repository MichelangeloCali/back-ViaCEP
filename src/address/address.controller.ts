import { Controller, Get, Param } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':postalCode')
  findAddress(@Param('postalCode') postalCode: string) {
    return this.addressService.findAddress(postalCode);
  }
}
