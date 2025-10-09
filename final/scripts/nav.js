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

    // Prevent reload if clicking the same page
    if (currentPath === targetPath) {
      e.preventDefault();
      // optionally scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
});