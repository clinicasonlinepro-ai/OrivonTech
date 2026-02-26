const canvas = document.getElementById("energyCanvas");
const ctx = canvas.getContext("2d");

let w, h;
let mouseX = window.innerWidth/2;
let mouseY = window.innerHeight/2;
let t = 0;

function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

window.addEventListener("mousemove", e=>{
  mouseX = e.clientX;
  mouseY = e.clientY;
});

window.addEventListener("touchmove", e=>{
  mouseX = e.touches[0].clientX;
  mouseY = e.touches[0].clientY;
});

function drawInfinity(offset){
  ctx.beginPath();

  for(let i=0;i<Math.PI*2;i+=0.02){

    let scale = 220;
    let gap = 25; // ESPAÇO ENTRE AS CURVAS

    let x = w/2 + Math.sin(i) * scale;
    let y = h/2 + (Math.sin(i*2)/2 * scale);

    if(i < Math.PI){
      y -= gap;
    } else {
      y += gap;
    }

    x += (mouseX - w/2) * 0.03;
    y += (mouseY - h/2) * 0.03;

    if(i===0){
      ctx.moveTo(x,y);
    } else {
      ctx.lineTo(x,y);
    }
  }

  const gradient = ctx.createLinearGradient(0,0,w,0);
  gradient.addColorStop(0,"#00c3ff");
  gradient.addColorStop(0.5,"#7b00ff");
  gradient.addColorStop(1,"#00f0ff");

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 3 + offset;

  ctx.shadowBlur = 40;
  ctx.shadowColor = "#7b00ff";

  ctx.stroke();
}

function animate(){
  ctx.clearRect(0,0,w,h);
  t += 0.02;

  drawInfinity(0);
  drawInfinity(2);
  drawInfinity(4);

  requestAnimationFrame(animate);
}

animate();