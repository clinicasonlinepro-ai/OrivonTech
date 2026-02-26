const canvas = document.getElementById("infinityCanvas");
const ctx = canvas.getContext("2d");

let width, height;
let pointerX = 0;
let pointerY = 0;
let targetX = 0;
let targetY = 0;

function resizeCanvas() {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

document.addEventListener("pointermove", (e) => {
    const rect = canvas.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
});

function drawInfinity(offset, color) {
    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.strokeStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 20;

    const centerX = width / 2 + (pointerX - width / 2) * 0.2;
    const centerY = height / 2 + (pointerY - height / 2) * 0.2;

    const size = Math.min(width, height) / 4;

    for (let t = -Math.PI + 0.3; t < Math.PI - 0.3; t += 0.01) {
        const x = centerX + size * Math.sin(t + offset);
        const y = centerY + size * Math.sin(t + offset) * Math.cos(t + offset);

        if (t === -Math.PI + 0.3) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.stroke();
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    // suaviza movimento
    pointerX += (targetX - pointerX) * 0.08;
    pointerY += (targetY - pointerY) * 0.08;

    // 3 linhas separadas com pequeno offset
    drawInfinity(0, "#003cff");      // azul escuro
    drawInfinity(0.15, "#7a00ff");   // roxo
    drawInfinity(-0.15, "#00ffe1");  // ciano

    requestAnimationFrame(animate);
}

animate();