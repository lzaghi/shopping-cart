const fetchProducts = async (item) => {
  if (!item) throw new Error('You must provide an url');

  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
  const request = await fetch(url);
  const response = await request.json();
  return response;
  // console.log(response);
};

// fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
