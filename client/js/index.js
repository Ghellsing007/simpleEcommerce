import { fetchProducts } from "./productsdb.js";
import { cart, addToCart, getTotalItems } from "./cartManager.js";

const showContent = document.getElementById("shopContent");

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
      addToCart(product);
      displayCartCounter();
    });
  });
}

function displayCartCounter() {
  const cartCounter = document.getElementById("cart-counter");
  const cartTotal = getTotalItems();
  cartCounter.style.display = cartTotal > 0 ? "block" : "none";
  cartCounter.innerHTML = cartTotal;
}

(async () => {
  try {
    const productos = await fetchProducts();
    renderProducts(productos);
  } catch (error) {
    console.error("Error al cargar y renderizar productos:", error);
  }
})();
