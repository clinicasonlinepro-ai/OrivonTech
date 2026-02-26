const canvas = document.getElementById("energyCanvas");
const ctx = canvas.getContext("2d");

let width, height;
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let lines = [];

function resize(){
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

function createLine(offset){
  let points = [];
  for(let i=0;i<40;i++){
    points.push({x:mouse.x,y:mouse.y + offset});
  }
  return points;
}

lines.push(createLine(-30));
lines.push(createLine(0));
lines.push(createLine(30));

window.addEventListener("mousemove", e=>{
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("touchmove", e=>{
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
});

function drawLine(points, gradient){
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for(let i=1;i<points.length;i++){
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 5;
  ctx.shadowBlur = 20;
  ctx.stroke();
}

function animate(){
  ctx.clearRect(0,0,width,height);

  const gradient = ctx.createLinearGradient(0,0,width,0);
  gradient.addColorStop(0,"#00c3ff");
  gradient.addColorStop(.5,"#7b00ff");
  gradient.addColorStop(1,"#00f0ff");

  lines.forEach((points,index)=>{
    points[0].x += (mouse.x - points[0].x)*0.2;
    points[0].y += ((mouse.y + (index-1)*30) - points[0].y)*0.2;

    for(let i=1;i<points.length;i++){
      points[i].x += (points[i-1].x - points[i].x)*0.2;
      points[i].y += (points[i-1].y - points[i].y)*0.2;
    }

    drawLine(points,gradient);
  });

  requestAnimationFrame(animate);
}

animate();

/* MENU MOBILE */

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");

hamburger.addEventListener("click", ()=>{
  mobileMenu.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", ()=>{
  mobileMenu.classList.remove("active");
  overlay.classList.remove("active");
});