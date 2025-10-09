async function loadProducts() {
  try {
    const response = await fetch('./products.json');
    if (!response.ok) throw new Error('Network response was not ok');
    const products = await response.json();

    const container = document.getElementById('products');

    const indoorProducts = products.filter(p => p.category === "Indoor");
    const outdoorProducts = products.filter(p => p.category === "Outdoor");

    function createSection(title, items) {
      const section = document.createElement('div');
      section.className = 'decor-section';

      
      const h2 = document.createElement('h2');
      h2.textContent = title;
      
      section.appendChild(h2);

      
      const grid = document.createElement('div');
      grid.className = 'decor-grid';

      items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'decor-item';
        div.innerHTML = `
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <div class="overlay">${item.name} — ${item.price}</div>
        `;
        div.addEventListener('click', () => div.classList.toggle('active'));
        grid.appendChild(div);
      });

      section.appendChild(grid);
      return section;
    }

    container.appendChild(createSection('Indoor Decorations', indoorProducts));
    container.appendChild(createSection('Outdoor Decorations', outdoorProducts));

  } catch (error) {
    console.error('Error loading products:', error);
    document.getElementById('products').innerHTML =
      '<p>Sorry, products could not be loaded.</p>';
  }
}

loadProducts();