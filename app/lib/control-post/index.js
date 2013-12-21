var express = require('express');
var conf = require('../util-common-conf');
var paramSlug = require('../util-param-slug');
var posts = require('../data-post');

var app = module.exports = conf(express(), __dirname);
app = paramSlug(app);

app.get('/post/:slug', function index(req, res) {
  posts.get({
    slug: req.params.slug,
    callback: function render(err, item) {
      if (!item) {
        res.status(404).send('The post you want to read, don\'t exist.');
        return;
      }
      res.render('index', {post: item});
    }
  });
});

app.post('/post/:slug', function posting(req, res) {
  var comment = req.body;
  comment.createdAt = new Date();
  posts.addComment({
    slug: req.params.slug,
    comment: comment,
    callback: function added(err, count) {
      res.redirect('/post/' + req.params.slug);
    }
  });
});
