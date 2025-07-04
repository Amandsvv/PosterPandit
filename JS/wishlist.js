function renderWishlist() {
    const container = document.getElementById("wishlist-container");
    const wishlist = getWishlistItems();

    if (!wishlist.length) {
        container.innerHTML = "<p>Your wishlist is empty.</p>";
        return;
    }

    container.innerHTML = "";

    wishlist.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
          <a href="goods.html?category=${product.category}&id=${product.id}" style="text-decoration: none; color: inherit;">
            <img src="${product.images[0]}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>Rs./ ${product.price}</p>
          </a>
          <div class="btn-group">
            <button class="btn btn-cart">Add to Cart</button>
            <button class="btn btn-remove">Remove</button>
          </div>
        `;

        card.querySelector(".btn-cart").addEventListener("click", () => {
            addToCart(product);
            removeFromWishlist(product.id, product.category);
            renderWishlist(); // re-render to reflect changes
        });


        card.querySelector(".btn-remove").addEventListener("click", () => {
            removeFromWishlist(product.id, product.category);
            renderWishlist();
        });

        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", renderWishlist);