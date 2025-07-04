let products;

async function fetchProductData() {
  try {
    const res = await fetch("../data/product.json"); // ✅ await here
    const allProducts = await res.json();             // ✅ await here

    // Combine all category arrays into a single array
    products = Object.values(allProducts).flat();     // ✅ flatten all category-wise products

    console.log(products); // For debugging

    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    const product = products.find(p => p.id === productId);
    if (product) renderProduct(product);
    else document.getElementById("product-detail-container").innerHTML = "<p>Product not found</p>";
  } catch (err) {
    console.error("Failed to load product data", err);
  }
}


async function fetchProductData() {
  try {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    const category = params.get("category"); // just in case

    // Load main product.json
    const res = await fetch("../data/product.json");
    const allProducts = await res.json();
    products = Object.values(allProducts).flat();

    // Try finding the product
    let product = products.find(p => p.id === productId);

    if (!product) {
      // Try fallback to featured products
      const featuredRes = await fetch("../data/popular.json");
      const featuredProducts = await featuredRes.json();
      product = featuredProducts.find(p => p.id === productId);
    }

    if (product) {
      renderProduct(product);
    } else {
      document.getElementById("product-detail-container").innerHTML = "<p>Product not found</p>";
    }
  } catch (err) {
    console.error("Failed to load product data", err);
  }
}

function renderProduct(product) {
  const container = document.getElementById("product-detail-container");

  const thumbnails = product.images.map(
    img => `<img class="thumbnail" src="${img}" alt="${product.title}">`
  ).join("");

  const aspects = product.aspects.map(
    point => `<li>${point}</li>`
  ).join("");

  container.innerHTML = `
    <div class="product-details">
      <div class="image-gallery">
        <div class="main-image">
          <img id="main-img" src="${product.images[0]}" alt="${product.name}">
        </div>
        <div class="thumbnail-list">${thumbnails}</div>
      </div>

      <div class="product-info">
        <h2>${product.name}</h2>
        <p><strong>Rs./</strong> ${product.price}</p>
        <p><strong>Category :</strong> ${product.category}</p>
        <p><strong>Dimension:</strong> ${product.dimension}</p>

        <div class="buttons">
          <button class="wishlist-btn">♡ Add to wishlist</button>
          <button class="cart-btn">🛒 Add to Cart</button>
        </div>
      </div>
    </div>

    <div class="tabs">
      <button class="tab active" data-tab="desc">Discription</button>
      <button class="tab" data-tab="info">Additional info</button>
      <button class="tab" data-tab="reviews">Reviews</button>
    </div>

    <div class="tab-content active" id="desc">
      <h3>About</h3>
      <p>${product.description}</p>
      <h3>Key Aspects</h3>
      <ul>${aspects}</ul>
    </div>
    <div class="tab-content" id="info"><p>Additional info coming soon...</p></div>
    <div class="tab-content" id="reviews"><p>No reviews yet.</p></div>
  `;

  // Setup image preview switching again
  document.querySelectorAll('.thumbnail').forEach(img => {
    img.addEventListener('click', () => {
      document.getElementById('main-img').src = img.src;
    });
  });

  // Setup tabs again
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });
}


fetchProductData();
