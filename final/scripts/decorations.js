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


setInterval(() => {
  index = (index + 1) % slides.length;
  updateSlide();
}, 4000);


const decorItems = document.querySelectorAll('.decor-item');

decorItems.forEach(item => {
  item.addEventListener('click', () => {
    
    item.classList.toggle('active');
  });
});


document.getElementById('year').textContent = new Date().getFullYear();