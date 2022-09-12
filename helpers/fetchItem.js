const fetchItem = async (itemID) => {
  if (!itemID) throw new Error('You must provide an url');

  const url = `https://api.mercadolibre.com/items/${itemID}`;
  const request = await fetch(url);
  const response = await request.json();
  return response;
  // console.log(response);
};

// fetchItem('MLB1341706310');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
