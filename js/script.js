const canvas = document.getElementById("canvas-js");
const context = canvas.getContext('2d');
context.canvas.width =  window.innerWidth;
context.canvas.height = window.innerHeight;
let particleArr;

//Particle constructor
function Particle(x,y, directionX, directionY, size, color){
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
}
// draw particles
Particle.prototype.draw = function(){
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI *2, false);
    context.fillStyle = this.color;
    context.fill();
} 

// update
Particle.prototype.update = function(){
    if (this.x + this.size > canvas.width  || this.x - this.size < 0){
        this.directionX = -this.directionX;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0){
        this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
}
// create the particle arr
function init(){
    particleArr = [];
    for (let i = 0; i < 100; i++){
        let size = 5
        let x = Math.random() * (innerWidth - size * 2);
        let y = Math.random() * (innerHeight - size * 2);
        let directionX = (Math.random() * .3) -.1;
        let directionY = (Math.random() * .3) - .1;
        let color = 'white';
        particleArr.push(new Particle(x,y, directionX, directionY, size, color));
    }
}
//animation
function animation(){
    requestAnimationFrame(animation);
    context.clearRect(0,0,innerWidth, innerHeight);
    for (let i = 0; i < particleArr.length; i++){
        particleArr[i].update();
    }
}
init();
animation();

window.addEventListener('resize', 
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    }
)