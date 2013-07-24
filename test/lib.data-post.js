var fs = require('fs');
var path = require('path');
var expect = require('expect.js');
var data = require('../lib/data.js');
var util = require('./util');

describe('post', function () {
  var db = data.getDb(util.dbName);
  var post = require('../lib/data-post');

  before(function (done) {
    util.remakedir(done);
  });
  
  beforeEach(function (done) {
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
  });
  
  describe('get', function () {
  });
  
  describe('update', function () {
  });
});