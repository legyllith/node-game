const socketio = require('socket.io');

module.exports = function(server) {
  // io server
  const io = socketio(server);
  
  // game state (players list)
  const players = {};
  
  io.on('connection', function(socket) {
    // register new player
    players[socket.id] = {
      x: 0,
      y: 0,
      size: 20,
      speed: 5,
      c: "#"+((1<<24)*Math.random()|0).toString(16) //creer un couleur random
    };
    
    // delete disconnected player
    socket.on('disconnect', function() {
      delete players[socket.id];
    });
  socket.on('move left',  function() { players[socket.id].x -= players[socket.id].speed; });
  socket.on('move up',    function() { players[socket.id].y -= players[socket.id].speed; });
  socket.on('move right', function() { players[socket.id].x += players[socket.id].speed; });
  socket.on('move down',  function() { players[socket.id].y += players[socket.id].speed; });
  });

function update() {
  io.volatile.emit('players list', Object.values(players));
}

setInterval(update, 1000/60);

};

const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: '141.94.23.39', 
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
asyncFunction()

