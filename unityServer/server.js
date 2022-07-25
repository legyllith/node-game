//var express = require("express");

//var app = express();

//app.get("/user/:id", (req, res) => {

//	var dummyData = {
//		"userid": req.params["id"],
//		"username": "quill" + req.params["id"],
//		"wins": 18,
//		"lossing": 1000,
//		"someArray": [
//			{name: "foo", value: 2.5},
//			{name: "bar", value: 7.1}
//		]
			
//	};

//	res.send(dummyData);
//});

//app.listen(3000, () => {
//	console.log("Server has started");
//});

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// game state (players list)
const players = {};

io.on('connection', (socket) => {
    console.log('a user connected');
    // register new player
    players[socket.id] = {
      id: socket.id,
      x: 5*Math.random(),
      y: 5*Math.random(),
    };
    io.emit('new player', players);
    

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
	var playerdeco = {
        "id": socket.id
        };
        console.log('user disconnected');
        io.emit('deconnected player', playerdeco);
      	delete players[socket.id];
    });

    socket.on('move left', function () { players[socket.id].x += 0.005; });
    socket.on('move up', function () { players[socket.id].y += 0.005; });
    socket.on('move right', function () { players[socket.id].x -= 0.005; });
    socket.on('move down', function () { players[socket.id].y -= 0.005; });
    //il faudrais faire les movements differement pour que le jeu les integre mieux si on veut du mouvement normalisé
    // faire une fonction qui génere la position du joueurs en fonction des X et Y recut
    // il faudra comparé la longeur de X et celle de Y afin d obtenir l'angle pour la direction
http.listen(3000, () => {
    console.log('Connected at 3000');
});

function update() {
  io.volatile.emit('position player', Object.values(players));
}
setInterval(update, 1000/60);