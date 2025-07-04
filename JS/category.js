const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get("category") || "books";

document.getElementById("category-title").textContent = selectedCategory.replace("-", " ");

fetch('../data/product.json') // Adjust path if needed
  .then(res => res.json())
  .then(data => {
    const products = data[selectedCategory];
    const container = document.getElementById("product-container");

    if (!products) {
      container.innerHTML = "<p>No products found for this category.</p>";
      return;
    }

    products.forEach(product => {
      const productWrapper = document.createElement("div");
      productWrapper.className = "product-item";

      // Product link section
      const productLink = document.createElement("a");
      productLink.href = `goods.html?category=${selectedCategory}&id=${product.id}`;
      productLink.className = "product-link";
      productLink.innerHTML = `
        <img src="${product.images[0]}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>Rs./ ${product.price}</p>
      `;

      // Add to cart / wishlist section
      const addBtn = document.createElement("div");
      addBtn.className = "add-btn";
      addBtn.innerHTML = `
        <img src="../Images/heart.png" alt="Add to wishlist" class="wishlist-btn" data-id="${product.id}" data-category="${selectedCategory}">
        <img src="../Images/cart.png" alt="Add to cart" class="cart-btn" data-id="${product.id}" data-category="${selectedCategory}">
      `;

      // Append both sections
      productWrapper.appendChild(productLink);
      productWrapper.appendChild(addBtn);
      container.appendChild(productWrapper);
    });

    // ✅ Add a single event listener to the container (Event Delegation)
    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("wishlist-btn") || e.target.classList.contains("cart-btn")) {
        e.preventDefault(); // Stop <a> navigation

        const id = e.target.dataset.id;
        const category = e.target.dataset.category;

        // Find product based on ID and category
        const product = data[category].find(p => p.id === id);
        if (!product) return alert("Product not found");

        if (e.target.classList.contains("wishlist-btn")) {
          addToWishlist(product); // Defined globally in wishlistCart.js
        }

        if (e.target.classList.contains("cart-btn")) {
          addToCart(product); // Defined globally in wishlistCart.js
        }
      }
    });
  })
  .catch(err => console.error("Error loading products:", err));
