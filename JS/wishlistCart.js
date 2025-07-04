// Keys used in localStorage
const CART_KEY = "user_cart";
const WISHLIST_KEY = "user_wishlist";

// Helper: get current items from localStorage
function getItems(key) {
  const items = localStorage.getItem(key);
  return items ? JSON.parse(items) : [];
}

// Helper: save items to localStorage
function saveItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

function showPopup(message) {
  const popup = document.getElementById("popup-message");
  if (!popup) return;

  popup.textContent = message;
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
}

function addToWishlist(product) {
  const wishlist = getItems(WISHLIST_KEY);

  if (!wishlist.find(item => item.id === product.id && item.category === product.category)) {
    wishlist.push(product);
    saveItems(WISHLIST_KEY, wishlist);
    showPopup("Added to wishlist!");
  } else {
    showPopup("Already in wishlist.");
  }
}

function addToCart(product) {
  const cart = getItems(CART_KEY);

  const existingItem = cart.find(item => item.id === product.id && item.category === product.category);
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  saveItems(CART_KEY, cart);
  showPopup("Added to cart!");
}


// Optional: remove functions
function removeFromWishlist(id, category) {
  let wishlist = getItems(WISHLIST_KEY);
  wishlist = wishlist.filter(item => !(item.id === id && item.category === category));
  saveItems(WISHLIST_KEY, wishlist);
}

function removeFromCart(id, category) {
  let cart = getItems(CART_KEY);
  cart = cart.filter(item => !(item.id === id && item.category === category));
  saveItems(CART_KEY, cart);
}

// Optional: get all items
function getCartItems() {
  return getItems(CART_KEY);
}

function getWishlistItems() {
  return getItems(WISHLIST_KEY);
}
