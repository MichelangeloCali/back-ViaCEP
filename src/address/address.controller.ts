import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.createAddress(createAddressDto);
  }

  @Get(':cep')
  findAddress(@Param('cep') cep: string) {
    return this.addressService.findAddress(cep);
  }
}
