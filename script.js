let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector('#tela');
let screenContext = screen.getContext('2d');

document.querySelectorAll('.colorArea .color').forEach((iten) => {
  iten.addEventListener('click', colorClickEvent);
});
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);

function colorClickEvent(e) {
  let color = e.target.getAttribute('data-color');
  currentColor = color;

  document.querySelector('.color.active').classList.remove('active');
  e.target.classList.add('active');
}

function mouseDownEvent(e) {
  canDraw = true;
  mouseX = e.pageX - screen.offsetLeft;
  mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e) {
  if (canDraw) {
    draw(e.pageX, e.pageY);
  }
}

function mouseUpEvent(e) {
  canDraw = false;
}

function draw(x, y) {
  let pointX = x - screen.offsetLeft;
  let pointY = y - screen.offsetTop;

  screenContext.beginPath();
  screenContext.lineWidth = 5;
  screenContext.lineJoin = 'round';
  screenContext.moveTo(mouseX, mouseY);
  screenContext.lineTo(pointX, pointY);
  screenContext.closePath();
  screenContext.strokeStyle = currentColor;
  screenContext.stroke();

  mouseX = pointX;
  mouseY = pointY;
}

function clearScreen() {
  screenContext.setTransform(1, 0, 0, 1, 0, 0);
  screenContext.clearRect(
    0,
    0,
    screenContext.canvas.width,
    screenContext.canvas.height
  );
}
