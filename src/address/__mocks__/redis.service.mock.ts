export class RedisServiceMock {
  constructor() {}

  saveAddress = jest.fn().mockImplementation();

  getAddress = jest.fn().mockImplementation((postalCode: string) => {
    return {
      postalCode,
      street: 'Test Street',
      neighborhood: 'Test Neighborhood',
      city: 'Test City',
    };
  });
}
