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

  describe('findAddress', () => {
    it('should return data from redis', async () => {
      const postalCode = '00000000';

      const result = await service.findAddress(postalCode);

      expect(redisService.getAddress).toHaveBeenCalledWith(postalCode);
      expect(result).toEqual({
        postalCode,
        street: 'Test Street Redis',
        neighborhood: 'Test Neighborhood Redis',
        city: 'Test City Redis',
      });
      expect(addressRepository.findOneAddress).not.toHaveBeenCalled();
      expect(httpService.get).not.toHaveBeenCalled();
    });

    it('should return data from data base', async () => {
      const postalCode = '11111111';

      const result = await service.findAddress(postalCode);

      expect(redisService.getAddress).toHaveBeenCalledWith(postalCode);
      expect(addressRepository.findOneAddress).toHaveBeenCalledWith(postalCode);
      expect(result).toEqual({
        postalCode,
        street: 'Test Street DB',
        neighborhood: 'Test Neighborhood DB',
        city: 'Test City DB',
      });
      expect(redisService.saveAddress).toHaveBeenCalledWith(postalCode, result);
      expect(httpService.get).not.toHaveBeenCalled();
    });

    //
    // it('should return data from viacep api', async () => {
    //   const postalCode = '80010030';
    //   const expectedUrl = `https://viacep.com.br/ws/${postalCode}/json`;

    //   const viaCepResponse = {
    //     cep: '80010030',
    //     logradouro: 'Test Street',
    //     bairro: 'Test Neighborhood',
    //     localidade: 'Test City',
    //   };

    //   jest.spyOn(HttpServiceMock, 'get').mockReturnValueOnce(
    //     Promise.resolve({
    //       data: viaCepResponse,
    //     }),
    //   );

    //   const result = await service.findAddress(postalCode);

    //   expect(redisService.getAddress).toHaveBeenCalledWith(postalCode);
    //   expect(addressRepository.findOneAddress).toHaveBeenCalledWith(postalCode);
    //   expect(httpService.get).toHaveBeenCalledWith(expectedUrl);
    //   expect(result).toEqual({
    //     postalCode,
    //     street: viaCepResponse.logradouro,
    //     neighborhood: viaCepResponse.bairro,
    //     city: viaCepResponse.localidade,
    //   });
    //   expect(addressRepository.createAddress).toHaveBeenCalledWith(result);
    //   expect(redisService.saveAddress).toHaveBeenCalledWith(postalCode, result);
    // });
  });
});
