import utils from './utils';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
var gravity = 1;
var friction = 0.99;
// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

addEventListener('click', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }
    if (
      this.x + this.radius + this.dx > canvas.width ||
      this.x - this.radius < 0
    ) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

// Implementation
let balls;
function init() {
  balls = [];
  for (let i = 0; i < 400; i++) {
    //  balls.push()
    var color = utils.randomColor(colors);
    var radius = utils.randomIntFromRange(5, 30);
    var dx = utils.randomIntFromRange(-2, 2);
    var dy = utils.randomIntFromRange(-2, 2);
    var x = utils.randomIntFromRange(radius, canvas.width - radius);
    var y = utils.randomIntFromRange(0, canvas.height - radius);
    balls.push(new Ball(x, y, dx, dy, radius, color));
  }
  console.log(balls);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y);
  balls.forEach((ball) => {
    ball.update();
  });
}

init();
animate();
