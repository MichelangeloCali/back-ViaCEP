export const HttpServiceMock = {
  get: jest.fn().mockImplementation((url: string) => {
    if (url === 'https://example.com/api/data') {
      return Promise.resolve({
        data: 'Mocked data',
      });
    } else {
      return Promise.reject(new Error('Invalid URL'));
    }
  }),
};
