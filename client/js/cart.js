import { cart, removeFromCart, getTotalPrice, getTotalItems } from "./cartManager.js";

const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");

const displayCart = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "block";
  modalOverlay.style.display = "block";

  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";

  const modalClose = document.createElement("div");
  modalClose.innerText = "❌";
  modalClose.className = "modal-close";
  modalHeader.append(modalClose);

  modalClose.addEventListener("click", () => {
    modalContainer.style.display = "none";
    modalOverlay.style.display = "none";
  });

  const modalTitle = document.createElement("h2");
  modalTitle.innerText = "Cart";
  modalTitle.className = "modal-title";
  modalHeader.append(modalTitle);

  modalContainer.append(modalHeader);

  if (cart.length > 0) {
    cart.forEach((product) => {
      const modalBody = document.createElement("div");
      modalBody.className = "modal-body";
      modalBody.innerHTML = `
        <div class="product">
            <img class="product-img" src="${product.img}" alt="${product.name}" />
            <h4>${product.name}</h4>
        </div>
        <div class="quantity"> 
            <button class="quantity-btn-decrease">-</button>
            <span class="quantity-input">${product.cant}</span>
            <button class="quantity-btn-increase">+</button>       
        </div>
        <div class="price">$${product.price * product.cant}</div>
        <button class="delete-product">❌</button>  
      `;
      modalContainer.append(modalBody);

      modalBody.querySelector(".quantity-btn-decrease").addEventListener("click", () => {
        if (product.cant > 1) {
          product.cant--;
        } else {
          removeFromCart(product.id);
        }
        displayCart();
      });

      modalBody.querySelector(".quantity-btn-increase").addEventListener("click", () => {
        product.cant++;
        displayCart();
      });

      modalBody.querySelector(".delete-product").addEventListener("click", () => {
        removeFromCart(product.id);
        displayCart();
      });
    });

    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalFooter.innerHTML = `<div class="total-price">Total: $${getTotalPrice()}</div>`;
    modalContainer.append(modalFooter);
  } else {
    const emptyCartMessage = document.createElement("h2");
    emptyCartMessage.className = "modal-body";
    emptyCartMessage.innerText = "Your cart is empty.";
    modalContainer.append(emptyCartMessage);
  }
};

cartBtn.addEventListener("click", displayCart);
