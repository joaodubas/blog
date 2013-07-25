var expect = require('expect.js');
var data = require('../lib/data.js');
var util = require('./util');

describe('post', function () {
  var db = data.getDb(util.dbName);
  var post = require('../lib/data-post');

  before(function (done) {
    util.remakedir(done);
  });
  
  afterEach(function (done) {
    util.clearCollection('posts', done);
  });

  describe('create', function () {
    it('successfuly add', function (done) {
      var data = {
        'title': 'test',
        'markdown': '#test',
        'body': '<h1>test</h1>',
        'slug': 'test',
        'createdAt': new Date(),
        'tags': ['test', 'other']
      };
      post.create({
        data: data,
        callback: function (err, items) {
          expect(items[0]).to.be.eql(data);
          done();
        }
      });
    });

    it('has error if no title is set', function (done) {
      var data = {
        'markdown': '#test',
        'body': '<h1>test</h1>',
        'slug': 'test',
        'createdAt': new Date(),
        'tags': ['test', 'other']
      };
      post.create({
        data: data,
        callback: function (err, items) {
          expect(err).to.be.ok();
          done();
        }
      });
    });
    
    it('has error if no slug is set', function (done) {
      var data = {
        'title': 'test',
        'markdown': '#test',
        'body': '<h1>test</h1>',
        'createdAt': new Date(),
        'tags': ['test', 'other']
      };
      post.create({
        data: data,
        callback: function (err, items) {
          expect(err).to.be.ok();
          done();
        }
      });
    });

    it('has error if no markdown is set', function (done) {
      var data = {
        'title': 'test',
        'body': '<h1>test</h1>',
        'slug': 'test',
        'createdAt': new Date(),
        'tags': ['test', 'other']
      };
      post.create({
        data: data,
        callback: function (err, items) {
          expect(err).to.be.ok();
          done();
        }
      });
    });

    it('has error if no body is set', function (done) {
      var data = {
        'title': 'test',
        'markdown': '#test',
        'slug': 'test',
        'createdAt': new Date(),
        'tags': ['test', 'other']
      };
      post.create({
        data: data,
        callback: function (err, items) {
          expect(err).to.be.ok();
          done();
        }
      });
    });
    
    it('has error if no creation date is set', function (done) {
      var data = {
        'title': 'test',
        'markdown': '#test',
        'body': '<h1>test</h1>',
        'slug': 'test',
        'tags': ['test', 'other']
      };
      post.create({
        data: data,
        callback: function (err, items) {
          expect(err).to.be.ok();
          done();
        }
      });
    });
  });

  describe('list', function () {
    beforeEach(function (done) {
      var posts = [];
      for (var i = 0; i < 10; i += 1) {
        posts.push({
          title: 'Post ' + i,
          slug: 'post-' + i,
          markdown: '## Post ' + i,
          body: '<h2>Post ' + i + '</h2>',
          createdAt: new Date(),
          tags: ['post', i]
        });
      }
      db.collection('posts').insert(posts, done);
    });

    it('get first five articles by default', function (done) {
      var expectedSlugs = ['post-9', 'post-8', 'post-7', 'post-6', 'post-5'];
      post.list({
        callback: function (err, cursor) {
          var items = [];
          cursor.each(function (err, item) {
            if (!item) {
              expect(items.length).to.be.equal(5);
              expect(items.map(function (item) {
                return item.slug;
              })).to.be.eql(expectedSlugs);
              done();
              return;
            }
            items.push(item);
          });
        }
      });
    });

    it('get first page of items', function (done) {
      var expectedSlugs = ['post-9', 'post-8', 'post-7', 'post-6', 'post-5'];
      post.list({
        page: 0,
        callback: function (err, cursor) {
          var items = [];
          cursor.each(function (err, item) {
            if (!item) {
              expect(items.map(function (item) {
                return item.slug;
              })).to.be.eql(expectedSlugs);
              done();
              return;
            }
            items.push(item);
          });
        }
      });
    });

    it('get second page of items', function (done) {
      var expectedSlugs = ['post-4', 'post-3', 'post-2', 'post-1', 'post-0'];
      post.list({
        page: 1,
        callback: function (err, cursor) {
          var items = [];
          cursor.each(function (err, item) {
            if (!item) {
              expect(items.map(function (item) {
                return item.slug;
              })).to.be.eql(expectedSlugs);
              done();
              return;
            }
            items.push(item);
          });
        }
      });
    });

    it('get 10 items per page', function (done) {
      var items = [];
      post.list({
        limit: 10,
        callback: function (err, cursor) {
          cursor.each(function (err, item) {
            if (!item) {
              expect(items.length).to.be.equal(10);
              done();
              return;
            }
            items.push(item);
          });
        }
      });
    });
});
  
  describe('get', function () {
    beforeEach(function (done) {
      var posts = [];
      for (var i = 0; i < 10; i += 1) {
        posts.push({
          title: 'Post ' + i,
          slug: 'post-' + i,
          markdown: '## Post ' + i,
          body: '<h2>Post ' + i + '</h2>',
          createdAt: new Date(),
          tags: ['post', i]
        });
      }
      db.collection('posts').insert(posts, done);
    });

    it('by slug', function (done) {
      post.get({
        slug: 'post-0',
        callback: function (err, item) {
          expect(item).to.be.ok();
          done();
        }
      });
    });

    it('pass null if no item match the query', function (done) {
      post.get({
        slug: 'post-10',
        callback: function (err, item) {
          expect(err).to.not.be.ok();
          expect(item).to.not.be.ok();
          done();
        }
      });
    });
  });
  
  describe('update', function () {
  });
});