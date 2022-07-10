const socket = io();

// const player = {
//   x: 0,
//   y: 0,
//   size: 20,
//   speed: 5
// };

let players = [];

socket.on('players list', function(list) {
  players = list;
});

const ctx = canvas.getContext('2d');

function drawPlayers() {
  players.forEach(function({x, y, size, c}) {
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fillStyle = c;
    ctx.fill();
  });
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
const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost', 
     user:'root', 
     password: 'ludiMON1996',
     connectionLimit: 5
});
async function asyncFunction() {
  let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("SELECT 1 as val");
	console.log(rows); //[ {val: 1}, meta: ... ]
	//const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
	//console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}