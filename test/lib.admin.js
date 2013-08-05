var expect = require('expect.js');
var req = require('supertest');
var data = require('../lib/data.js');
var util = require('./util');

describe('admin', function () {
  var db = data.getDb(util.dbName);
  var app = require('../app.js');

  before(function (done) {
    util.remakedir(done);
  });

  beforeEach(function (done) {
    var posts = [
      {
        title: 'Post one',
        slug: 'post-one',
        markdown: '## Post one',
        body: '<h2>Post one</h2>',
        createdAt: new Date(),
        tags: ['post', 'one']
      },
      {
        title: 'Post two',
        slug: 'post-two',
        markdown: '## Post two',
        body: '<h2>Post two</h2>',
        createdAt: new Date(),
        tags: ['post', 'two']
      }
    ];
    data.getCollection('posts').insert(posts, done);
  });

  afterEach(function (done) {
    util.clearCollection('posts', done);
  });

  describe('posts', function () {
    describe('list', function () {
      it('show list', function (done) {
        req(app)
          .get('/admin')
          .expect(200)
          .end(function (err, res) {
            done();
          });
      });
    });

    describe('add', function () {
      it('show add form', function (done) {
        req(app)
          .get('/admin/new')
          .expect(200)
          .end(function (err, res) {
            done();
          });
      });

      it('create a new post', function (done) {
        var post = {
          title: 'Test post',
          markdown: '## Test',
          tags: 'hello, word'
        };
        req(app)
          .post('/admin/new')
          .send(post)
          .expect(302)
          .end(function (err, res) {
            done();
          });
      });
    });

    describe('update', function () {
      it('show update form', function (done) {
        req(app)
          .get('/admin/edit/post-one')
          .expect(200)
          .end(function (err, res) {
            done();
          });
      });

      it('update post details', function(done) {
        var post = {
          title: 'Updating post',
          markdown: '## Post updated',
          tags: 'hello, update'
        };

        req(app)
          .put('/admin/edit/post-one')
          .send(post)
          .expect(302)
          .end(function (err, res) {
            done();
          });
      });
    });

    describe('remove', function () {
      it('delete post details', function (done) {
        req(app)
          .del('/admin/remove/post-one')
          .expect(302)
          .end(function (err, res) {
            done();
          });
      });
    });
  });
});
