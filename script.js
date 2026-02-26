const canvas = document.getElementById("infinityCanvas");
const ctx = canvas.getContext("2d");

let width, height;
let centerX, centerY;
let scale;

let targetX = 0;
let currentX = 0;

function resize() {
  const dpr = window.devicePixelRatio || 1;

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  ctx.scale(dpr, dpr);

  centerX = width / 2;
  centerY = height / 2;

  scale = Math.min(width, height) / 6;
}

window.addEventListener("resize", resize);
resize();

function drawInfinity(offset) {
  ctx.beginPath();

  const a = scale;

  for (let t = 0; t < Math.PI * 2; t += 0.01) {
    const x = (a * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
    const y =
      (a * Math.sin(t) * Math.cos(t)) /
      (1 + Math.sin(t) * Math.sin(t));

    if (t === 0) {
      ctx.moveTo(centerX + x + offset, centerY + y);
    } else {
      ctx.lineTo(centerX + x + offset, centerY + y);
    }
  }

  ctx.stroke();
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  currentX += (targetX - currentX) * 0.08;

  ctx.lineWidth = 6;
  ctx.shadowBlur = 25;
  ctx.shadowColor = "#8a2be2";

  const gradient = ctx.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, "#00bfff");
  gradient.addColorStop(0.5, "#8a2be2");
  gradient.addColorStop(1, "#00ffff");

  ctx.strokeStyle = gradient;

  // 3 traços juntos com micro offset
  drawInfinity(currentX - 4);
  drawInfinity(currentX);
  drawInfinity(currentX + 4);

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("mousemove", (e) => {
  targetX = (e.clientX - width / 2) * 0.3;
});

window.addEventListener("touchmove", (e) => {
  targetX = (e.touches[0].clientX - width / 2) * 0.3;
});