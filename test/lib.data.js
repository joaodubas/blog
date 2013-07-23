var fs = require('fs');
var path = require('path');
var expect = require('expect.js');
var data = require('../lib/data.js');

describe('data', function () {
  var dbName = 'testdb';
  var dbPath = path.join(__dirname, '..', dbName);

  before(function (done) {
    fs.mkdir(dbPath, done);
  });

  after(function (done) {
    var db = data.getDb();
    db.dropDatabase(function () {
      fs.rmdir(dbPath, done);
    })
  })

  describe('database', function () {
    it('provide a database', function () {
      expect(data.getDb(dbName)).to.be.ok();
    });
  });
  
  describe('collection', function () {
    var db = data.getDb(dbName);
    var collName = 'test';

    afterEach(function (done) {
      db.dropCollection(collName, done);
    });
    
    it('provide access to the collection', function () {
      expect(data.getCollection(collName)).to.be.ok();
    });
  })
});