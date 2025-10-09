const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinksContainer.classList.toggle('active');
});

const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const currentPath = window.location.pathname.split('/').pop();
    const targetPath = link.getAttribute('href');

    
    if (currentPath === targetPath) {
      e.preventDefault();
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
});