// Referencias al DOM
const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");
const cart = []; // Carrito de compras

// Función para mostrar el carrito en el modal
const displayCart = () => {
  // Limpiar contenido previo del modal
  modalContainer.innerHTML = "";
  modalContainer.style.display = "block";
  modalOverlay.style.display = "block";

  // Modal Header
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

  // Modal Body
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

      // Botones de aumentar/disminuir cantidad
      const decreaseBtn = modalBody.querySelector(".quantity-btn-decrease");
      decreaseBtn.addEventListener("click", () => {
        if (product.cant > 1) {
          product.cant--;
          displayCart();
        }
        displayCartCounter();
      });

      const increaseBtn = modalBody.querySelector(".quantity-btn-increase");
      increaseBtn.addEventListener("click", () => {
        product.cant++;
        displayCart();
        displayCartCounter();
      });

      // Eliminar producto del carrito
      const deleteBtn = modalBody.querySelector(".delete-product");
      deleteBtn.addEventListener("click", () => {
        deleteCartProduct(product.id);
      });
    });

    // Modal Footer
    const total = cart.reduce((acc, el) => acc + el.price * el.cant, 0);
    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalFooter.innerHTML = `<div class="total-price">Total: $${total}</div>`;
    modalContainer.append(modalFooter);
  } else {
    const emptyCartMessage = document.createElement("h2");
    emptyCartMessage.className = "modal-body";
    emptyCartMessage.innerText = "Your cart is empty.";
    modalContainer.append(emptyCartMessage);
  }
};

// Evento para abrir el carrito
cartBtn.addEventListener("click", displayCart);

// Función para eliminar un producto del carrito
const deleteCartProduct = (id) => {
  const productIndex = cart.findIndex((product) => product.id === id);
  if (productIndex !== -1) {
    cart.splice(productIndex, 1); // Eliminar producto del carrito
    displayCart();
    displayCartCounter();
  }
};

// Función para actualizar el contador del carrito
const displayCartCounter = () => {
  const totalItems = cart.reduce((acc, product) => acc + product.cant, 0);
  if (totalItems > 0) {
    cartCounter.style.display = "block";
    cartCounter.innerText = totalItems;
  } else {
    cartCounter.style.display = "none";
  }
};
