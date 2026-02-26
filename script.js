const hamburger=document.getElementById("hamburger");
const mobileMenu=document.getElementById("mobileMenu");
const overlay=document.getElementById("overlay");

hamburger.addEventListener("click",()=>{
mobileMenu.classList.toggle("active");
overlay.classList.toggle("active");
});

overlay.addEventListener("click",()=>{
mobileMenu.classList.remove("active");
overlay.classList.remove("active");
});

/* INFINITY EFFECT */

const canvas=document.getElementById("energyCanvas");
const ctx=canvas.getContext("2d");

let w,h,mouseX=0,mouseY=0;

function resize(){
w=canvas.width=window.innerWidth;
h=canvas.height=window.innerHeight;
}
resize();
window.addEventListener("resize",resize);

window.addEventListener("mousemove",e=>{
mouseX=e.clientX;
mouseY=e.clientY;
});

window.addEventListener("touchmove",e=>{
mouseX=e.touches[0].clientX;
mouseY=e.touches[0].clientY;
});

function draw(){
ctx.clearRect(0,0,w,h);

ctx.lineWidth=3;
ctx.shadowBlur=25;

for(let j=0;j<3;j++){

ctx.beginPath();

for(let i=0;i<Math.PI*2;i+=0.01){

let scale=220;
let gap=30;

let x=scale*Math.sin(i);
let y=scale*Math.sin(i)*Math.cos(i);

if(i<Math.PI){y-=gap}else{y+=gap}

x+= (mouseX-w/2)*0.02;
y+= (mouseY-h/2)*0.02;

ctx.lineTo(w/2+x,h/2+y);
}

const gradient=ctx.createLinearGradient(0,0,w,0);
gradient.addColorStop(0,"#00c3ff");
gradient.addColorStop(.5,"#7b00ff");
gradient.addColorStop(1,"#00ffff");

ctx.strokeStyle=gradient;
ctx.shadowColor="#7b00ff";
ctx.stroke();
}
requestAnimationFrame(draw);
}

draw();