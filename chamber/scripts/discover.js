const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');

  // Toggle aria-expanded for accessibility
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !expanded);
});


async function loadDiscover() {
  const response = await fetch('data/discover.json');
  const items = await response.json();
  const container = document.getElementById('discover-cards');

  container.innerHTML = items.map(item => `
    <div class="card">
      <h2>${item.title}</h2>
      <figure>
        <img src="${item.image}" alt="${item.title}" width="300" height="200" loading="lazy">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button>Learn More</button>
    </div>
  `).join('');
}

// Visitor message logic
function showVisitMessage() {
  const messageEl = document.getElementById('visit-message');
  const lastVisit = localStorage.getItem('lastVisit');
  const now = Date.now();

  if (!lastVisit) {
    messageEl.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysSince < 1) {
      messageEl.textContent = "Back so soon! Awesome!";
    } else if (daysSince === 1) {
      messageEl.textContent = `You last visited 1 day ago.`;
    } else {
      messageEl.textContent = `You last visited ${daysSince} days ago.`;
    }
  }

  localStorage.setItem('lastVisit', now);
}

loadDiscover();
showVisitMessage();

// ✅ Footer Year + Last Modified
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
