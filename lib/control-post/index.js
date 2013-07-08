var path = require('path');
var posts = require('data-post');
var express = require('express');
var app = module.exports = express();

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.param('slug', function _slug(req, res, next, val) {
  var regex = /^[\w\-]+$/;
  var captures;
  if (captures = regex.exec(String(val))) {
    req.params.slug = captures[0];
    next();
  } else {
    next('route');
  }
});
app.get('/post/:slug', function index(req, res) {
  posts.get({
    slug: req.params.slug,
    callback: function render(err, item) {
      res.render('index', {post: item});
    }
  });
});
