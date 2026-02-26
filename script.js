const canvas = document.getElementById("energyCanvas");
const ctx = canvas.getContext("2d");

let w, h;
let mouse = { x: null, y: null };

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
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("touchmove", (e) => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
});

let time = 0;

function drawInfinity(offset) {
  const centerX = w / 2;
  const centerY = h / 2;

  const scale = Math.min(w, h) / 6;

  ctx.beginPath();

  for (let t = 0; t < Math.PI * 2; t += 0.01) {
    let x = scale * Math.sin(t);
    let y = scale * Math.sin(t) * Math.cos(t);

    // Interação com mouse
    if (mouse.x !== null) {
      const dx = mouse.x - (centerX + x);
      const dy = mouse.y - (centerY + y);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        x -= dx * 0.05;
        y -= dy * 0.05;
      }
    }

    ctx.lineTo(centerX + x + offset, centerY + y + offset);
  }

  ctx.stroke();
}

function animate() {
  ctx.clearRect(0, 0, w, h);

  ctx.lineWidth = 4;

  ctx.shadowBlur = 20;

  const colors = [
    "rgba(0,195,255,0.9)",
    "rgba(123,0,255,0.9)",
    "rgba(0,255,255,0.9)"
  ];

  colors.forEach((color, i) => {
    ctx.strokeStyle = color;
    ctx.shadowColor = color;

    const waveOffset = Math.sin(time + i) * 5;

    drawInfinity(waveOffset);
  });

  time += 0.02;
  requestAnimationFrame(animate);
}

animate();