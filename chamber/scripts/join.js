const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');

  // Toggle aria-expanded for accessibility
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !expanded);
});

document.getElementById("timestamp").value = new Date().toISOString();

    
    document.querySelectorAll(".open-modal").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        document.querySelector(link.getAttribute("href")).showModal();
      });
    });
    document.querySelectorAll(".close-modal").forEach(btn => {
      btn.addEventListener("click", () => {
        btn.closest("dialog").close();
      });
    });

    // ✅ Footer Year + Last Modified
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;


     

