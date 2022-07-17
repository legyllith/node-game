var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;


// Middleware
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send("Hello World");
})
app.get('/login', (req, res) => {
    res.render('../login')
})
