// MENU MOBILE
const hamburger = document.getElementById("hamburger");
const menuMobile = document.getElementById("menuMobile");
const overlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
  menuMobile.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  menuMobile.classList.remove("active");
  overlay.classList.remove("active");
});

// RGB EFFECT
const canvas = document.getElementById("rgbCanvas");
const ctx = canvas.getContext("2d");

let width, height;
let mouseX = 0;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
});

window.addEventListener("touchmove", (e) => {
  mouseX = e.touches[0].clientX;
});

function animate() {
  ctx.clearRect(0, 0, width, height);

  const gradient = ctx.createLinearGradient(mouseX - 200, 0, mouseX + 200, 0);
  gradient.addColorStop(0, "#3b82f6");
  gradient.addColorStop(0.5, "#8b5cf6");
  gradient.addColorStop(1, "#06b6d4");

  ctx.fillStyle = gradient;
  ctx.fillRect(mouseX - 200, 0, 400, height);

  requestAnimationFrame(animate);
}

animate();