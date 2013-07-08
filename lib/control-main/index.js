var path = require('path');
var express = require('express');
var app = module.exports = express();

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function index(req, res) {
  res.render('index', {
    posts: []
  });
});
