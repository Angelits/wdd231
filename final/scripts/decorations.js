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

// Select all decor items
const decorItems = document.querySelectorAll('.decor-item');

decorItems.forEach(item => {
  item.addEventListener('click', () => {
    // Toggle only the clicked item
    item.classList.toggle('active');
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();