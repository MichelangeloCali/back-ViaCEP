import { Test, TestingModule } from '@nestjs/testing';
import { Mocked } from 'jest-mock';
import { AddressService } from './address.service';
import { AddressRepository } from './address.repository';
import { RedisService } from '../redis/redis.service';
import { AddressRepositoryMock } from './__mocks__/address.repository.mock';
import { RedisServiceMock } from './__mocks__/redis.service.mock';
import { HttpService } from '@nestjs/axios';
import { HttpServiceMock } from './__mocks__/http.service.mock';

describe('AddressService', () => {
  let service: AddressService;
  let addressRepository: AddressRepository;
  let redisService: RedisService;
  let httpService: Mocked<HttpService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        { provide: AddressRepository, useClass: AddressRepositoryMock },
        { provide: RedisService, useClass: RedisServiceMock },
        { provide: HttpService, useValue: HttpServiceMock },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    addressRepository = module.get<AddressRepository>(AddressRepository);
    redisService = module.get<RedisService>(RedisService);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(addressRepository).toBeDefined();
    expect(redisService).toBeDefined();
    expect(httpService).toBeDefined();
  });
});
