let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

function rentProduct(productName, price, image) {

    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    let existing = cart.find(item => item.name === productName);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));

    alert(productName + " added to cart!");
}

function loadCart() {

    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

    let cartItemsDiv = document.getElementById("cart-items");

    let total = 0;

    cartItemsDiv.innerHTML = "";

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;

        total += itemTotal;

        cartItemsDiv.innerHTML += `
        <div class="card">

            <img src="${item.image}" width="80">

            <h3>${item.name}</h3>

            <p>₹${item.price} / month</p>

            <p>Quantity: 
                <button onclick="decreaseQty(${index})">-</button>
                ${item.quantity}
                <button onclick="increaseQty(${index})">+</button>
            </p>

            <p>Subtotal: ₹${itemTotal}</p>

            <button onclick="removeItem(${index})">Remove</button>

        </div>
        `;
    });

    document.getElementById("total").innerText =
        "Total Rent: ₹" + total;
}

let totalDiv = document.getElementById("total");

if (totalDiv) {
    totalDiv.innerText = "Total Rent: ₹" + total;
}
function increaseQty(index) {

    let cart = JSON.parse(localStorage.getItem("cartItems"));

    cart[index].quantity += 1;

    localStorage.setItem("cartItems", JSON.stringify(cart));

    loadCart();
}

function decreaseQty(index) {

    let cart = JSON.parse(localStorage.getItem("cartItems"));

    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    }

    localStorage.setItem("cartItems", JSON.stringify(cart));

    loadCart();
}

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cartItems", JSON.stringify(cart));

    loadCart();
}

function checkout() {
    alert("Order placed successfully!");
    localStorage.removeItem("cartItems");
    location.reload();
}

window.onload = loadCart;