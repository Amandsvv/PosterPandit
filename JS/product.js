  fetch('../data/categories.json')
  .then(res => res.json())
  .then(categories => {
    const container = document.getElementById('dynamicCategoryGrid');
    categories.forEach(cat => {
      const div = document.createElement('div');
      div.className = 'product-category-item';
      div.innerHTML = `
        <a href="../html/category.html?category=${cat.slug}">
          <img src="../${cat.image}" alt="${cat.name}">
          <p>${cat.name}</p>
        </a>
      `;
      container.appendChild(div);
    });
  })
  .catch(err => console.error("Failed to load categories:", err));