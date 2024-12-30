
const showContent = document.getElementById("shopContent");
const cart = [];

productos.forEach((product) =>{
    const content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p class="price">$ ${product.price}</p>
    
    `
    showContent.append(content);

    const buyButton = document.createElement("button");
    buyButton.innerText = "Buy"; 

    content.append(buyButton);

    buyButton.addEventListener("click", ()=>{
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            cant: product.price,
            img: product.img
        });
        
    });




})


