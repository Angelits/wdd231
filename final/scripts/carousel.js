// hamburger menu //
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


const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
let index = 0;

function updateSlide() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

nextButton.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  updateSlide();
});

prevButton.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  updateSlide();
});

// Optional: Auto-play every 4s
setInterval(() => {
  index = (index + 1) % slides.length;
  updateSlide();
}, 4000);

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();