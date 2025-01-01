import { fetchProducts } from "./productsdb.js"; // Importa la función de productsdb.js

const showContent = document.getElementById("shopContent");
const cart = [];

// Función para renderizar productos
function renderProducts(productos) {
  productos.forEach((product) => {
    const content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">$ ${product.price}</p>
    `;
    showContent.append(content);

    const buyButton = document.createElement("button");
    buyButton.innerText = "Buy";

    content.append(buyButton);

    buyButton.addEventListener("click", () => {
      const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);

      if (repeat) {
        cart.map((prod) => {
          if (prod.id === product.id) {
            prod.cant++;
            displayCartCounter();
          }
        });
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          cant: product.cant,
          img: product.img,
        });
        displayCartCounter();
      }
    });
  });
}

// Función para mostrar el contador del carrito
function displayCartCounter() {
  const cartCounter = document.getElementById("cart-counter"); // Agrega el elemento para mostrar el contador
  const cartTotal = cart.reduce((acc, el) => acc + el.cant, 0);
  if (cartTotal > 0) {
    cartCounter.style.display = "block";
    cartCounter.innerHTML = cartTotal;
  } else {
    cartCounter.style.display = "none";
  }
}

// Cargar y renderizar productos al inicio
(async () => {
  try {
    const productos = await fetchProducts(); // Obtiene los productos desde productsdb.js
    renderProducts(productos); // Renderiza los productos en el DOM
  } catch (error) {
    console.error("Error al cargar y renderizar productos:", error);
  }
})();
