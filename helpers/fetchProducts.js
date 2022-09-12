const fetchProducts = async (produto) => {
  if (!produto) throw new Error('You must provide an url');

  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
  const request = await fetch(url);
  const response = await request.json();
  return response;
  // console.log(response.results);
};

// fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
