const { expect } = require('@jest/globals');
require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('checks if fetchItem is a function', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('checks if fetch is called and url when fetchItem("MLB1615760527")', async () => {
    await fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('checks data when fetchItem("MLB1615760527")', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });
  it('checks if error when no parameter', async () => {
    try {
      await fetchItem();
    } catch (err) {
      expect(err).toEqual(new Error ('You must provide an url'));
    }
  });
});
