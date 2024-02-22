export class AddressServiceMock {
  constructor() {}

  findAddress = jest.fn().mockImplementation((postalCode: string) => {
    return {
      postalCode,
      street: 'Test Street',
      neighborhood: 'Test Neighborhood',
      city: 'Test City',
    };
  });
}
