document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("subtotal");
  const itemCountEl = document.getElementById("total-items");
  const totalEl = document.getElementById("total");
  const cartSum = document.querySelector(".cart-summary")

  const DELIVERY_CHARGE = 40;

  function getCartItems() {
    const items = localStorage.getItem("user_cart");
    return items ? JSON.parse(items) : [];
  }

  function saveCartItems(items) {
    localStorage.setItem("user_cart", JSON.stringify(items));
  }

  function calculateTotal(cart) {
    let subtotal = 0;
    let totalItems = 0;
    cart.forEach(item => {
      subtotal += item.price * item.quantity;
      totalItems += item.quantity;
    });

    subtotalEl.textContent = `Rs./ ${subtotal}`;
    itemCountEl.textContent = `Sub Total (${totalItems} items)`;
    totalEl.textContent = `Rs./ ${subtotal + DELIVERY_CHARGE}`;
  }

  function updateCartUI() {
    const cart = getCartItems();
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartSum.innerHTML=""
      return;
    }

    cart.forEach(product => {
      const item = document.createElement("div");
      item.className = "cart-item";

      item.innerHTML = `
        <div class="product-detail">
          <img src="${product.images[0]}" alt="${product.name}" class="product-img">
          <div>
            <p class="product-name">${product.name}</p>
            <p class="product-price">Rs./ ${product.price}</p>
          </div>
        </div>
        <div class="cart-right-details">
          <div class="product-qty">
            <button class="qty-btn" data-id="${product.id}" data-category="${product.category}" data-action="decrease">-</button>
            <span class="qty">${product.quantity}</span>
            <button class="qty-btn" data-id="${product.id}" data-category="${product.category}" data-action="increase">+</button>
          </div>
          <div class="product-subtotal">Rs./ ${product.price * product.quantity}</div>
          <div class="product-action">
            <button class="remove-btn" data-id="${product.id}" data-category="${product.category}"><img src="../Images/recycle-bin.png" alt="delete button"></button>
          </div>
        </div>
      `;

      cartContainer.appendChild(item);
    });

    calculateTotal(cart);
  }

  cartContainer.addEventListener("click", function (e) {
    const btn = e.target;
    const id = btn.dataset.id;
    const category = btn.dataset.category;
    const action = btn.dataset.action;

    let cart = getCartItems();
    const item = cart.find(p => p.id === id && p.category === category);

    if (btn.classList.contains("qty-btn")) {
      if (action === "increase") item.quantity++;
      if (action === "decrease" && item.quantity > 1) item.quantity--;
      saveCartItems(cart);
      updateCartUI();
    }

    if (btn.classList.contains("remove-btn")) {
      cart = cart.filter(p => !(p.id === id && p.category === category));
      saveCartItems(cart);
      updateCartUI();
    }
  });

  updateCartUI();

  document.querySelector('.checkout-btn').addEventListener('click',()=>{
    console.log("clicked")
    window.location.href ="checkOut.html"
  })
});