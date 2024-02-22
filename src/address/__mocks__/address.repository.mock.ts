import { CreateAddressDto } from '../dto/create-address.dto';

export class AddressRepositoryMock {
  constructor() {}

  createAddress = jest
    .fn()
    .mockImplementation((addressData: CreateAddressDto) => {
      return {
        ...addressData,
        id: 'test-id',
      };
    });

  findOneAddress = jest.fn().mockImplementation((postalCode: string) => {
    return {
      postalCode,
      street: 'Test Street',
      neighborhood: 'Test Neighborhood',
      city: 'Test City',
    };
  });
}
