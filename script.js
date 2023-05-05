// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail, price }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${price}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.item__id').innerText;

const cartList = document.querySelector('.cart__items');
const total = document.querySelector('.total-price');

const subTotal = (preco) => {
  base = localStorage.getItem('total');
  let convertido = JSON.parse(base);
  convertido -= Number(preco);
  const arredondado = Math.round((convertido + Number.EPSILON) * 100) / 100;
  total.innerHTML = arredondado;
  localStorage.setItem('total', JSON.stringify(arredondado));
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, thumbnail, price }) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const x = document.createElement('i');
  span.innerHTML = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  x.className = 'material-icons';
  x.innerHTML = 'close';
  li.className = 'cart__item';
  li.appendChild(createProductImageElement(thumbnail));
  li.appendChild(span);
  // li.innerHTML = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.appendChild(x);
  x.addEventListener('click', cartItemClickListener = (event) => {
    event.target.parentNode.remove();
    saveCartItems(JSON.stringify(cartList.innerHTML));

    subTotal(price);
  });
  return li;
};

const addTotal = (preco) => {
  base = localStorage.getItem('total');
  let convertido = JSON.parse(base);
  convertido += Number(preco);
  const arredondado = Math.round((convertido + Number.EPSILON) * 100) / 100;
  total.innerHTML = arredondado;
  localStorage.setItem('total', JSON.stringify(arredondado));
};

const addCartByID = async (id) => {
  const data = await fetchItem(id);
  const li = createCartItemElement(data);

  cartList.appendChild(li);
  saveCartItems(JSON.stringify(cartList.innerHTML));

  addTotal(data.price);
};

const captureItemID = () => {
  const addButtons = document.getElementsByClassName('item__add');
  for (let i = 0; i < addButtons.length; i += 1) {
    addButtons[i].addEventListener('click', (event) => {
      const sectionPai = event.target.parentElement;
      const id = sectionPai.firstChild.innerText;

      addCartByID(id);
    }); 
  }
};

const removeLoading = () => {
  const loading = document.querySelector('.loading');
  if (loading) loading.remove();
};

const addProducts = async (product = 'computador') => {
  const data = await fetchProducts(product);
  console.log(data);
  if (!data.results.length) alert('Nenhum produto encontrado!');
  removeLoading();
  const itemsList = document.querySelector('.items');

  data.results.forEach((e) => {
    const item = createProductItemElement(e);
    itemsList.appendChild(item);
  });

  captureItemID();
};

const input = document.getElementById('search-input');
input.addEventListener('keypress', (event) => {
  if (input.value && event.key === 'Enter') {
    const itemsList = document.querySelector('.items');
    for (let i = itemsList.children.length - 1; i >= 0; i -= 1) {
      itemsList.lastChild.remove();
    }
    // itemsList.children.remove();

    addProducts(input.value);
    input.value = '';
  }
});

const pegaValor = (string) => {
  const array = string.split('$');
  const valor = array[1];

  subTotal(valor);
};

const removeFromCart = () => {
  console.log('chamou remove');
  const lista = document.getElementsByClassName('cart__item');
  for (let i = lista.length - 1; i >= 0; i -= 1) {
    lista[i].lastChild.addEventListener('click', (event) => {
      console.log(event.target);
      event.target.parentNode.remove();
      localStorage.setItem('cartItems', JSON.stringify(cartList.innerHTML));

      const string = event.target.previousSibling.innerHTML;
      pegaValor(string);
    });
  }
};

const pegaDoLocal = () => {
  if (getSavedCartItems() !== null) {
    const cartItems = localStorage.getItem('cartItems');
    cartList.innerHTML = JSON.parse(cartItems);
  }

  removeFromCart();
};

const atualizaTotal = () => {
  if (localStorage.getItem('total') === null) {
    localStorage.setItem('total', '0');
    total.innerHTML = 0;
  } else {
    base = localStorage.getItem('total');
    const convertido = JSON.parse(base);
    total.innerHTML = convertido;
  }
};

const emptyCart = () => {
  const buttonEmpty = document.querySelector('.empty-cart');
  buttonEmpty.addEventListener('click', () => {
    console.log(cartList.children);
    for (let i = cartList.children.length - 1; i >= 0; i -= 1) {
      cartList.children[i].remove();
    }
    saveCartItems(JSON.stringify(cartList.innerHTML));

    localStorage.setItem('total', '0');
    total.innerHTML = 0;
  });
};

window.onload = () => {
  addProducts();
  pegaDoLocal();
  atualizaTotal();
  emptyCart();
};
