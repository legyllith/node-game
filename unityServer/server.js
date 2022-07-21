var express = require("express");

var app = express();

app.get("/user/:id", (req, res) => {

	var dummyData = {
		"userid": req.params["id"],
		"username": "quill" + req.params["id"],
		"wins": 18,
		"lossing": 1000,
	};

	res.send(dummyData.username);
});

app.listen(3000, () => {
	console.log("Server has started");
});