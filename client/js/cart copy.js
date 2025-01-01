const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");


const displayCart = () => {


  modalContainer.innerHTML = "";
  modalContainer.style.display = "block";
  modalOverlay.style.display = "block";

  //modal header
  const modalHeader = document.createElement("div");

  const modalClose = document.createElement("div");
  modalClose.innerText = "❌";
  modalClose.className = "modal-close";
  modalHeader.append(modalClose);

  modalClose.addEventListener("click", () => {
    modalContainer.style.display = "none";
    modalOverlay.style.display = "none";
  });

  const modalTitle = document.createElement("div");
  modalTitle.innerText = "cart";
  modalTitle.className = "modal-title";
  modalHeader.append(modalTitle);

  modalContainer.append(modalHeader);

  //modal Body

  if (cart.length > 0){

  cart.forEach(product => {
    const modalBody = document.createElement("div");
    modalBody.className = "modal-body";
    modalBody.innerHTML = `
    <div class="product">
        <img class="product-img" src="${product.img}" />
        <h4>${product.name}</h4>
    </div>

    <div class="quantity"> 
        <span class= "quantity-btn-decrease">-</span>
        <span class= "quantity-input">${product.cant}</span>
        <span class= "quantity-btn-increase">+</span>       
    </div>

    <div class="price">${product.price * product.cant} $</div>
    <div class="delete-product">❌</div>  
    </div>   
    `;
    modalContainer.append(modalBody);
    
    const decrese = modalBody.querySelector(".quantity-btn-decrease");
    decrese.addEventListener("click", () => {

      if(product.cant != 1){
        product.cant--;
        displayCart();
      }
      displayCartCounter();      
    });

    const increase = modalBody.querySelector(".quantity-btn-increase");
    increase.addEventListener("click", () => {
      product.cant++;
      displayCart();
      displayCartCounter();
    });

        // delete prooduct

    const deleteProduct = modalBody.querySelector(".delete-product");
    deleteProduct.addEventListener("click", () => {
      deleteCartProduct(product.id);
      

    });



    
  });

    //modal Footer

const total = cart.reduce((acc, el) => acc + el.price * el.cant, 0);
  const modalFooter = document.createElement("div");
  modalFooter.innerText = "❌";
  modalFooter.className = "modal-footer";
  modalFooter.innerHTML = `<div class="total-price"> Total: ${total}$ </div> `
  modalContainer.append(modalFooter);
}else{
  const modalText = document.createElement("h2");
  modalText.className = "modal-body";
  modalText.innerHTML =  "Your cart is empty";
  modalContainer.append(modalText);
}
};

cartBtn.addEventListener("click", displayCart);

const deleteCartProduct = (id) => {
  const foundId = cart.findIndex((element) => element.id === id);
  cart.splice(foundId, 1);
  displayCart();
  displayCartCounter();
};



const displayCartCounter = () =>{
  const cartTotal = cart.reduce((acc, el) => acc +  el.cant, 0);
  if(cartTotal > 0){
    cartCounter.style.display = "block"
    cartCounter.innerHTML = cartTotal;
  }else{
    cartCounter.style.display = "none"
  }
};
