var path = require('path');
var engine = require('tingodb')({});
var _db = null;
var _collections = {};

module.exports.getDb = getDb;
module.exports.getCollection = getCollection;
module.exports.ObjectID = engine.ObjectID;

function getDb() {
  if (!_db) {
    _db = new engine.Db(path.join(__dirname, '..', 'db'), {});
  }
  return _db;
}

function getCollection(name) {
  if (!_collections[name]) {
    if (!_db) {
      _db = getDb();
    }
    _collections[name] = _db.collection(name);
  }
  return _collections[name];
}
