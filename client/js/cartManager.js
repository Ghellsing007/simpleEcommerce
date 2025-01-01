export const cart = []; // Carrito global

// Función para agregar productos al carrito
export const addToCart = (product) => {
  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.cant++;
  } else {
    cart.push({ ...product, cant: 1 });
  }
};

// Función para eliminar un producto del carrito
export const removeFromCart = (id) => {
  const productIndex = cart.findIndex((product) => product.id === id);
  if (productIndex !== -1) {
    cart.splice(productIndex, 1);
  }
};

// Función para obtener el total de productos en el carrito
export const getTotalItems = () => {
  return cart.reduce((total, product) => total + product.cant, 0);
};

// Función para obtener el total en precio
export const getTotalPrice = () => {
  return cart.reduce((total, product) => total + product.price * product.cant, 0);
};
