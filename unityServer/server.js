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
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
http.listen(3000, () => {
    console.log('Connected at 3000');
});