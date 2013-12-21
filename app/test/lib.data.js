var fs = require('fs');
var path = require('path');
var expect = require('expect.js');
var data = require('../lib/data.js');
var util = require('./util');

describe('data', function () {
  before(function (done) {
    util.remakedir(done);
  });

  describe('database', function () {
    it('provide a database', function () {
      expect(data.getDb(util.dbName)).to.be.ok();
    });
  });
  
  describe('collection', function () {
    var db = data.getDb(util.dbName);
    var collName = 'test';

    afterEach(function (done) {
      db.dropCollection(collName, done);
    });
    
    it('provide access to the collection', function () {
      expect(data.getCollection(collName)).to.be.ok();
    });
  });
});