import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Address } from './entities/address.entity';

@Injectable()
export class AddressRepository {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async createAddress(addressData: Omit<Address, 'id'>): Promise<Address> {
    const newAddress = this.addressRepository.create(addressData);
    return await this.addressRepository.save(newAddress);
  }

  async findOneAddress(cep: string): Promise<Address | undefined> {
    return await this.addressRepository.findOne({ where: { cep } });
  }
}
