const contactLink = document.querySelector('a[href="#contact"]');

if (contactLink) {
  contactLink.addEventListener('click', e => {
    e.preventDefault(); // stops default jump
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
}