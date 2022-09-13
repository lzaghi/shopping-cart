const getSavedCartItems = () => {
  localStorage.getItem('cartItems');
  // if (localStorage.getItem('cartItems') === null) {
  //   localStorage.setItem('cartItems', JSON.stringify());
  // } else {
    // const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    // console.log(cartItems);
    // const cartList = document.querySelector('.cart__items');
    // cartList.outerHTML = cartItems;
  // }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
