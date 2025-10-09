const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Smooth scroll to contact
const contactLink = document.querySelector('a[href="#contact"]');
if (contactLink) {
  contactLink.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
}

// Form submission confirmation
const form = document.getElementById('contactForm');
const confirmation = document.getElementById('confirmation');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault(); // stop the browser from trying to load another page
    confirmation.style.display = 'block';
    form.reset();
  });
}


async function loadDecorations() {
  try {
    const res = await fetch('data/decorations.json');
    const data = await res.json();
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = data.items.map(item => `
      <img src="${item.image}" alt="${item.name}" loading="lazy">
    `).join('');
  } catch (err) {
    console.error('Error loading decorations', err);
  }
}

loadDecorations();