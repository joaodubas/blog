var expect = require('expect.js');
var request = require('supertest');
var data = require('../lib/data.js');
var util = require('./util');

describe('home', function () {
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

  it('get page', function (done) {
    request(app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        expect(res.text.match(/class="app\-article"/gi).length).to.be.equal(2);
        done();
      });
  });
});
