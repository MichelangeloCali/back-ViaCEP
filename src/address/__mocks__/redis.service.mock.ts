export class RedisServiceMock {
  constructor() {}

  saveAddress = jest.fn().mockImplementation();

  getAddress = jest.fn().mockImplementation((postalCode: string) => {
    if (postalCode === '00000000') {
      return {
        postalCode,
        street: 'Test Street Redis',
        neighborhood: 'Test Neighborhood Redis',
        city: 'Test City Redis',
      };
    }
  });
}
