import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async createAddress(addressData: CreateAddressDto): Promise<Address> {
    const newAddress = this.addressRepository.create(addressData);
    return await this.addressRepository.save(newAddress);
  }

  async findOneAddress(postalCode: string): Promise<Address | undefined> {
    return await this.addressRepository.findOne({ where: { postalCode } });
  }
}
