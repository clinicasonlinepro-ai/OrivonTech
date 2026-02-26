const canvas = document.getElementById("energyCanvas");
const ctx = canvas.getContext("2d");

let w, h;
let mouseX = 0;
let mouseY = 0;

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  w = window.innerWidth;
  h = window.innerHeight;

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

window.addEventListener("touchmove", (e) => {
  mouseX = e.touches[0].clientX;
  mouseY = e.touches[0].clientY;
});

let time = 0;

function drawInfinity(offset) {
  const centerX = w / 2;
  const centerY = h / 2;
  const scale = Math.min(w, h) / 5;

  ctx.beginPath();

  for (let t = 0; t <= Math.PI * 2; t += 0.01) {
    const xBase = scale * Math.sin(t);
    const yBase = scale * Math.sin(t) * Math.cos(t);

    const gap = 20;

    let x = xBase + offset;
    let y = yBase;

    if (t < Math.PI) {
      y -= gap;
    } else {
      y += gap;
    }

    // interação suave
    const dx = mouseX - (centerX + x);
    const dy = mouseY - (centerY + y);
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 200) {
      x -= dx * 0.04;
      y -= dy * 0.04;
    }

    ctx.lineTo(centerX + x, centerY + y);
  }

  ctx.stroke();
}

function animate() {
  ctx.clearRect(0, 0, w, h);

  ctx.lineWidth = 4;
  ctx.shadowBlur = 30;

  const gradient = ctx.createLinearGradient(0, 0, w, 0);
  gradient.addColorStop(0, "#00c3ff");
  gradient.addColorStop(0.5, "#7b00ff");
  gradient.addColorStop(1, "#00ffff");

  ctx.strokeStyle = gradient;
  ctx.shadowColor = "#7b00ff";

  drawInfinity(Math.sin(time) * 10);
  drawInfinity(Math.sin(time + 1) * 10);
  drawInfinity(Math.sin(time + 2) * 10);

  time += 0.02;
  requestAnimationFrame(animate);
}

animate();