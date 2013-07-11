var express = require('express');
var conf = require('util-common-conf');
var posts = require('data-post');

var app = module.exports = conf(express(), __dirname);
app.use(express.bodyParser());

app.get('/', function index(req, res) {
  var page = isNaN(req.query['pagina']) ? 0 : Number(req.query['pagina']);
  posts.list({
    page: page,
    callback: function render(err, cursor) {
      var posts = [];
      cursor.each(function process(err, item) {
        if (!item) {
          res.render('index', {
            posts: posts,
            prevPage: !page ? page : page - 1,
            nextPage: !posts.length ? page : page + 1
          });
          return;
        }
        posts.push(item);
      });
    }
  });
});
