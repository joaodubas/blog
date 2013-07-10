var path = require('path');
var express = require('express');
var marked = require('marked');
var slug = require('slug');

var posts = require('data-post');
var app = module.exports = express();

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.use(express.bodyParser());
app.use(express.methodOverride());

marked.setOptions({
  gfm: true
});

function fromRequestToPost(post) {
  post.body = marked(post.markdown);
  post.createdAt = new Date();
  post.publishAt = new Date(Date.parse(post.publishAt));
  post.slug = slug(post.title.toLowerCase());
  post.tags = post.tags.split(',').map(function (value) { return value.toLowerCase().trim(); });
  return post;
}

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

app.get('/admin', function list(req, res) {
  var page = isNaN(req.query['pagina']) ? 0 : Number(req.query['pagina']);
  posts.list({
    page: page,
    limit: 20,
    callback: function render(err, cursor) {
      var posts = [];
      cursor.each(function process(err, item) {
        if (!item) {
          res.render('list', {
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

app.get('/admin/new', function creating(req, res) {
  res.render('create', {post: {}});
});

app.post('/admin/new', function create(req, res) {
  posts.create({
    data: fromRequestToPost(req.body),
    callback: function created(err, count) {
      res.redirect('/admin');
    }
  });
});

app.get('/admin/edit/:slug', function get(req, res) {
  posts.get({
    slug: req.params.slug,
    callback: function retrieved(err, item) {
      item.publishAtText = item.publishAt.toISOString().split('T')[0];
      item.tagsText = item.tags.join(', ');
      res.render(
        'edit',
        {
          post: item,
          _override: 'PUT'
        }
      );
    }
  });
});

app.put('/admin/edit/:slug', function update(req, res) {
  posts.update({
    slug: req.params.slug,
    data: fromRequestToPost(req.body),
    callback: function updated(err, count) {
      res.redirect('/admin');
    }
  });
});

app.del('/admin/remove/:slug', function remove(req, res) {
  posts.remove({
    slug: req.params.slug,
    callback: function removed(err, count) {
      res.redirect('/admin');
    }
  });
});
