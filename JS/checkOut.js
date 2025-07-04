document.addEventListener("DOMContentLoaded", renderCheckoutItems);

function renderCheckoutItems() {
  const orderItemsContainer = document.querySelector(".order-items");
  const subTotalEl = document.getElementById("subTotal");
  const totalAmountEl = document.getElementById("totalAmount");
  const itemCountEl = document.getElementById("itemCount");

  const cartItems = getCartItems();
  let subTotal = 0;
  let itemCount = 0;

  if (!cartItems.length) {
    orderItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    subTotalEl.textContent = "Rs./ 0";
    totalAmountEl.textContent = "Rs./ 0";
    itemCountEl.textContent = "0";
    return;
  }

  orderItemsContainer.innerHTML = "";

  cartItems.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subTotal += itemTotal;
    itemCount += item.quantity;

    const itemHTML = `
      <div class="checkout-item" style="display: flex; gap: 10px; align-items: center; margin-bottom: 12px;">
        <img src="${item.images[0]}" alt="${item.name}" />
        <div style="flex-grow: 1;">
          <strong>${item.name}</strong><br />
          Quantity: <span>${item.quantity}</span>
        </div>
        <div style="font-weight: 500;">Rs./ ${itemTotal}</div>
        <button class="remove" data-id="${item.id}" data-category="${item.category}"><img src="../Images/recycle-bin.png" alt="remove Button"></button>
      </div>
      <hr/>
    `;
    orderItemsContainer.innerHTML += itemHTML;
  });

  const total = subTotal + 40;
  subTotalEl.textContent = `Rs./ ${subTotal}`;
  totalAmountEl.textContent = `Rs./ ${total}`;
  itemCountEl.textContent = itemCount;

  attachRemoveEvents();
}

function attachRemoveEvents() {
  document.querySelectorAll(".remove").forEach(btn => {
    btn.addEventListener("click", () => {
      removeFromCart(btn.dataset.id, btn.dataset.category);
      renderCheckoutItems();
    });
  });
}

document.querySelector(".place-order").addEventListener("click", function (e) {
  e.preventDefault();

  const formFields = document.querySelectorAll("#billingForm input[required]");
  let isValid = true;

  formFields.forEach(input => {
    if (!input.value.trim()) {
      input.style.border = "1px solid red";
      isValid = false;
    } else {
      input.style.border = "";
    }
  });

  const payment = document.querySelector("input[name='payment']:checked");
  if (!payment) {
    alert("Please select a payment method.");
    isValid = false;
  }

  if (!isValid) {
    alert("Please fill all required fields correctly.");
    return;
  }

  const cart = getCartItems();
  if (!cart.length) {
    alert("Your cart is empty.");
    return;
  }

  const order = {
    billing: Object.fromEntries(new FormData(document.getElementById("billingForm"))),
    cart,
    total: document.getElementById("totalAmount").textContent,
    paymentMode: payment.value
  };

  console.log("Order placed:", order);
  saveItems(CART_KEY, []);
  alert("Order placed successfully!");
  window.location.href = "thankyou.html";
});
