import { Inject, Injectable } from '@nestjs/common';
import { Address } from 'src/address/entities/address.entity';
import { RedisRepository } from './redis.repository';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

@Injectable()
export class RedisService {
  constructor(
    @Inject(RedisRepository) private readonly redisRepository: RedisRepository,
  ) {}

  async saveAddress(
    postalCode: string,
    address: CreateAddressDto,
  ): Promise<void> {
    // Expiry is set to 1 day
    await this.redisRepository.set(
      postalCode,
      JSON.stringify(address),
      ONE_DAY_IN_SECONDS,
    );
  }

  async getAddress(postalCode: string): Promise<Omit<Address, 'id'> | null> {
    const product = await this.redisRepository.get(postalCode);
    return JSON.parse(product);
  }
}
