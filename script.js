
// 🟢 FILTER ITEMS (only once)
function filterItems(category) {
    let items = document.querySelectorAll('.service-card');

    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// 🟢 CART SYSTEM
let total = 0;
let cart = [];
let currentItem = {};

// 🟢 SHOW POPUP
function showBox(name, price, image) {
    document.getElementById("box").style.display = "block";

    document.getElementById("name").innerText = name;
    document.getElementById("price").innerText = price;
    document.getElementById("image").src = image;

    currentItem = {
        name: name,
        price: parseInt(price.replace('₹',''))
    };
}

// 🟢 ADD TO CART + CLOSE POPUP
function closeBox() {
    document.getElementById("box").style.display = "none";

    addToCart(currentItem);
}

// 🟢 ADD ITEM TO CART
function addToCart(item) {
    let cartList = document.getElementById("cartList");

    let li = document.createElement("li");

    li.innerHTML = `
        ${item.name} - ₹${item.price} 
        <br>
        <button onclick="decreaseQty(this, ${item.price})">➖</button>
        <span class="qty">1</span>
        <button onclick="increaseQty(this, ${item.price})">➕</button>
    `;

    cartList.appendChild(li);

    total += item.price;
    document.getElementById("totalPrice").innerText = "Total: ₹" + total;
}
// 🟢 CHECKOUT
function checkout() {
    alert("Order placed! Total: ₹" + total);
}

// 🟢 WHATSAPP ORDER (ALL ITEMS)
function orderWhatsApp() {
    let phone = "919059783504"; // 👉 add 91 (India code)

    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    let message = "🛒 Order Details:\n";

    cart.forEach(item => {
        message += item.name + " - ₹" + item.price + "\n";
    });

    message += "\nTotal: ₹" + total;

    let url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

    window.open(url, "_blank");
}

// 🟢 CONTACT FORM
document.addEventListener("DOMContentLoaded", function () {

    let form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();

            document.getElementById("success").style.display = "block";

            setTimeout(() => {
                document.getElementById("success").style.display = "none";
            }, 3000);

            this.reset();
        });
    }
});

function removeItem(button, price) {
    let li = button.parentElement;

    // remove item from UI
    li.remove();

    // update total
    total -= price;
    document.getElementById("totalPrice").innerText = "Total: ₹" + total;
}


function increaseQty(button, price) {
    let qtySpan = button.parentElement.querySelector(".qty");

    let qty = parseInt(qtySpan.innerText);
    qty++;

    qtySpan.innerText = qty;

    total += price;
    document.getElementById("totalPrice").innerText = "Total: ₹" + total;
}


function decreaseQty(button, price) {
    let parent = button.parentElement;
    let qtySpan = parent.querySelector(".qty");

    let qty = parseInt(qtySpan.innerText);

    if (qty > 1) {
        qty--;
        qtySpan.innerText = qty;

        total -= price;
    } else {
        // remove item if qty = 1
        parent.remove();
        total -= price;
    }

    document.getElementById("totalPrice").innerText = "Total: ₹" + total;
}