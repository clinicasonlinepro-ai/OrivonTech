// ================= MENU HAMBURGUER =================

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const mobileOverlay = document.getElementById("mobileOverlay");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    mobileOverlay.classList.toggle("active");
  });
}

if (mobileOverlay) {
  mobileOverlay.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    mobileOverlay.classList.remove("active");
  });
}


// ================= EFEITO INFINITY =================

const canvas = document.getElementById("infinityCanvas");

if (canvas) {

  const ctx = canvas.getContext("2d");

  let width, height;

  let pointer = { x: 0, y: 0 };
  let target = { x: 0, y: 0 };

  function resizeCanvas() {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    pointer.x = width / 2;
    pointer.y = height / 2;
    target.x = width / 2;
    target.y = height / 2;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  canvas.addEventListener("pointermove", (e) => {
    const rect = canvas.getBoundingClientRect();
    target.x = e.clientX - rect.left;
    target.y = e.clientY - rect.top;
  });

  canvas.addEventListener("pointerdown", (e) => {
    const rect = canvas.getBoundingClientRect();
    target.x = e.clientX - rect.left;
    target.y = e.clientY - rect.top;
  });

  function drawInfinity(color, separation) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 25;

    const baseX = width / 2 + (pointer.x - width / 2) * 0.25;
    const baseY = height / 2 + (pointer.y - height / 2) * 0.25;

    const size = Math.min(width, height) / 4;

    for (let t = -Math.PI; t < Math.PI; t += 0.01) {

      const denom = 1 + Math.sin(t) * Math.sin(t);

      const x = baseX + (size * Math.cos(t)) / denom;
      const y = baseY + (size * Math.sin(t) * Math.cos(t)) / denom;

      const offsetX = x + separation * Math.cos(t);
      const offsetY = y + separation * Math.sin(t);

      if (t === -Math.PI) {
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY);
      }
    }

    ctx.stroke();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    pointer.x += (target.x - pointer.x) * 0.08;
    pointer.y += (target.y - pointer.y) * 0.08;

    drawInfinity("#003cff", -6);
    drawInfinity("#7a00ff", 0);
    drawInfinity("#00ffe1", 6);

    requestAnimationFrame(animate);
  }

  animate();
}