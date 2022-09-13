const { expect } = require('@jest/globals');
const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('checks if localStorage.getItem is called and its parameter when getSavedCartItems()', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems')
  });
});
