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
      x: 5*Math.random(),
      y: 5*Math.random(),
    };
    io.emit('new player', players);
    

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
      	delete players[socket.id];
    });
});
http.listen(3000, () => {
    console.log('Connected at 3000');
});