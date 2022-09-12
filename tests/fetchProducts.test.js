const { expect } = require('@jest/globals');
require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('checks if fetchProducts is a function', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('checks if fetch is called and url when fetchProducts("computador")', async () => {
    await fetchProducts('computador')
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('checks data when fetchProducts("computador")', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });
  it('checks if error when no parameter', async () => {
    try {
      await fetchProducts();
    } catch (err) {
      expect(err).toEqual(new Error ('You must provide an url'));
    }
  });
});
