import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AddressServiceMock } from './__mocks__/address.service.mock';

describe('AddressController', () => {
  let controller: AddressController;
  let addressService: AddressService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [{ provide: AddressService, useClass: AddressServiceMock }],
    }).compile();

    controller = module.get<AddressController>(AddressController);
    addressService = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(addressService).toBeDefined();
  });
});
