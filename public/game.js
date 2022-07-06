const socket = io();

// const player = {
//   x: 0,
//   y: 0,
//   size: 20,
//   speed: 5
// };

let players = [];

const ctx = canvas.getContext('2d');

function drawPlayers() {
  players.forEach(function({x, y, size, c}) {
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fillStyle = c;
    ctx.fill();
  });
}
socket.on('players list', function(list) {
  players = list;
});

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 1. Effacer la zone de dessin,
  drawPlayers();                                    // 2.Dessiner les joueurs,
  requestAnimationFrame(update);                    // 3.Aller à 1.
}
// first call
requestAnimationFrame(update);

const keyboard = {};

window.onkeydown = function(e) {
  keyboard[e.key] = true;
};

window.onkeyup = function(e) {
  delete keyboard[e.key];
};

function movePlayer() {
  if (keyboard['ArrowLeft']) socket.emit('move left');
  if (keyboard['ArrowUp']) socket.emit('move up');
  if (keyboard['ArrowRight']) socket.emit('move right');
  if (keyboard['ArrowDown']) socket.emit('move down');
}
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movePlayer(); // *
  drawPlayers();
  requestAnimationFrame(update);
}