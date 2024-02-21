import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
@Injectable()
export class AddressService {
  create(createAddressDto: CreateAddressDto) {
    console.log(createAddressDto);
    return 'This action adds a new address';
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }
}
