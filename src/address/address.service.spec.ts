import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';

import { AddressService } from './address.service';
import { AddressRepository } from './address.repository';
import { RedisService } from '../redis/redis.service';

describe('AddressService', () => {
  let service: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [AddressService, AddressRepository, RedisService],
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
