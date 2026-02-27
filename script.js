// ============================
// MENU HAMBURGER + DESFOQUE
// ============================

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".mobile-overlay");
const body = document.body;

function toggleMenu() {
  mobileMenu.classList.toggle("active");
  overlay.classList.toggle("active");
  hamburger.classList.toggle("active");
  body.classList.toggle("menu-open");
}

hamburger.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);

// Fecha menu ao clicar em link
document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    hamburger.classList.remove("active");
    body.classList.remove("menu-open");
  });
});


// ============================
// ANIMAÇÃO SUAVE AO ROLAR
// ============================

const sections = document.querySelectorAll(".section, .hero, .exemplo-card");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.15 });

sections.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = "translateY(40px)";
  section.style.transition = "all 0.8s ease";
  observer.observe(section);
});


// ============================
// SCROLL SUAVE PARA ÂNCORAS
// ============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});


// ============================
// EFEITO HEADER AO ROLAR
// ============================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.background = "rgba(11,11,15,0.95)";
  } else {
    header.style.background = "rgba(11,11,15,0.85)";
  }
});