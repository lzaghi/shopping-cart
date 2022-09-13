const saveCartItems = (item) => {
  localStorage.setItem('cartItems', item);
  // const array = JSON.parse(localStorage.getItem('cartItems'));
  // // console.log(array);
  // array[0] = item;
  // localStorage.setItem('cartItems', JSON.stringify(item));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
