import { Test, TestingModule } from '@nestjs/testing';

import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AddressRepository } from './address.repository';
import { RedisService } from '../redis/redis.service';

describe('AddressController', () => {
  let controller: AddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [AddressService, AddressRepository, RedisService],
    }).compile();

    controller = module.get<AddressController>(AddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
