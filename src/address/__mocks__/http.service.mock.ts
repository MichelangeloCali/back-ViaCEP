export const HttpServiceMock = {
  get: jest.fn().mockImplementation((url: string) => {
    const expectedUrl = 'https://viacep.com.br/ws/80010030/json';
    if (url === expectedUrl) {
      return Promise.resolve({
        data: {
          cep: '80010-030',
          logradouro: 'Test Street',
          bairro: 'Test Neighborhood',
          localidade: 'Test City',
        },
      });
    } else {
      return Promise.reject(new Error('URL Inválida'));
    }
  }),
};
