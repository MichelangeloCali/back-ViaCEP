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
    if (postalCode === '11111111') {
      return {
        postalCode,
        street: 'Test Street DB',
        neighborhood: 'Test Neighborhood DB',
        city: 'Test City DB',
      };
    }
  });
}
