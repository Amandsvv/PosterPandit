document.querySelector(".User-icon").addEventListener('click', () => {
  const userBox = document.querySelector(".user-icon-box");

  if (userBox.style.display === "none") {
    userBox.style.display = "flex";
  } else {
    userBox.style.display = "none"
  }
});

document.querySelector(".menu-icon").addEventListener('click', () => {
  const menuBox = document.querySelector(".menu")

  if (menuBox.style.display === "none") {
    menuBox.style.display = "flex";
  } else {
    menuBox.style.display = "none"
  }
})


document.querySelector(".product-btn").addEventListener('click', () => {
  const userBox = document.querySelector(".products-box");

  if (userBox.style.display === "none") {
    userBox.style.display = "flex";
  } else {
    userBox.style.display = "none"
  }
});



fetch('../data/categories.json') // update with correct path
  .then(res => res.json())
  .then(categories => {
    const container = document.getElementById('categoryLinksBox');

    const leftDiv = document.createElement('div');
    leftDiv.className = 'products-box-left';

    const rightDiv = document.createElement('div');
    rightDiv.className = 'products-box-right';

    categories.forEach((cat, index) => {
      const a = document.createElement('a');
      a.href = `../html/category.html?category=${encodeURIComponent(cat.slug)}`;
      a.innerHTML = `${cat.name}`;

      if (index < Math.ceil(categories.length / 2)) {
        leftDiv.appendChild(a);
      } else {
        rightDiv.appendChild(a);
      }
    });

    container.appendChild(leftDiv);
    container.appendChild(rightDiv);
  })
  .catch(error => console.error('Error loading categories:', error));

fetch('../data/popularCat.json')
  .then(res => res.json())
  .then(categories => {
    const container = document.getElementById('popular-cat');
    categories.forEach(cat => {
      const div = document.createElement('div');
      div.className = 'popular-categories';
      div.innerHTML = `
        <a href="../html/category.html?category=${cat.slug}">
          <p>${cat.name}</p>
        </a>
      `;
      container.appendChild(div);
    });
  })
  .catch(err => console.error("Failed to load categories:", err));


document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/popular.json")
    .then(res => res.json())
    .then(products => {
      const wrapper = document.getElementById("products-wrapper");
      wrapper.innerHTML = "";

      products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product-item";
        productDiv.innerHTML = `
          <a href="../html/goods.html?&id=${product.id}" style="text-decoration: none; color: inherit;">
              <img src="${product.images[0]}" alt="${product.name}">
          </a>
          <div>
              <p>${product.name}</p>
              <p>Rs./ ${product.price}</p>
              </div>
          <div class="add-btn">
              <img src="../Images/heart.png" alt="add to wishlist" class="wishlist-btn" data-id="${product.id}">
              <img src="../Images/cart.png" alt="Add to cart" class="cart-btn" data-id="${product.id}">
          </div>
          `;
        wrapper.appendChild(productDiv);
      });

      attachEvents(products);
    });
});

function attachEvents(products) {
  document.querySelectorAll(".wishlist-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const product = products.find(p => p.id === id);
      addToWishlist(product);
    });
  });

  document.querySelectorAll(".cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const product = products.find(p => p.id === id);
      addToCart(product);
    });
  });
}
