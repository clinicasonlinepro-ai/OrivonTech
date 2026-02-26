const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileOverlay = document.getElementById("mobileOverlay");

// Abrir menu
hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  mobileOverlay.classList.toggle("active");
});

// Fechar ao clicar no overlay
mobileOverlay.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  mobileOverlay.classList.remove("active");
});

// Fechar ao clicar em qualquer link
document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    mobileOverlay.classList.remove("active");
  });
});