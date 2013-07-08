var path = require('path');
var posts = require('data-post');
var express = require('express');
var app = module.exports = express();

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
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
