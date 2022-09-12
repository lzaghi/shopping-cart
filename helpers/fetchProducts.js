const fetchProducts = async () => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  const request = await fetch(url);
  const response = await request.json();
  console.log(response);
};

fetchProducts();

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
