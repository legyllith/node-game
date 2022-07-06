const player = {
  x: 0,
  y: 0,
  size: 20,
  speed: 5
};

const ctx = canvas.getContext('2d');

function drawPlayers() {
  const {x, y, size} = player;
  ctx.beginPath();
  ctx.rect(x, y, size, size);
  ctx.fill();
}

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
  if (keyboard['ArrowLeft']) player.x -= player.speed; // left
  if (keyboard['ArrowUp']) player.y -= player.speed; // up
  if (keyboard['ArrowRight']) player.x += player.speed; // right
  if (keyboard['ArrowDown']) player.y += player.speed; // down
}
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movePlayer(); // *
  drawPlayers();
  requestAnimationFrame(update);
}