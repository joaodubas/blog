var fs = require('fs');
var path = require('path');
var data = require('../../lib/data.js');

var dbName = 'testdb';
var dbPath = path.join(__dirname, '..', '..', dbName);

module.exports.dbName = dbName;
module.exports.mkdir = mkdir;
module.exports.rmdir = rmdir;
module.exports.remakedir = remakedir;
module.exports.clearCollection = clearCollection;

function hasdir(cb) {
  fs.exists(dbPath, cb);
}

function ls(cb) {
  fs.readdir(dbPath, cb);
}

function mkdir(cb) {
  function _mkdir(exists) {
    if (exists) {
      cb();
      return;
    }
    fs.mkdir(dbPath, cb);
  }
  hasdir(_mkdir);
}

function rm(filename) {
  if (!filename) return;
  
}

function rmdir(cb) {
  function _lsdir(err, files) {
    if (err) {
      cb(err);
      throw err;
    }
    function rmfile() {
      fs.rmdir(path.join(dbPath, files.shift(0, 1)), function () {
        if (!files.length) {
          fs.rmdir(dbPath, cb);
        } else {
          rmfile();
        }
      });
    }
    rmfile();
  }
  function _rmdir(exists) {
    if (!exists) {
      cb();
      return;
    }
    ls(_lsdir);
  }

  hasdir(_rmdir);
}

function remakedir(cb) {
  rmdir(function () {
    mkdir(cb);
  });
}

function clearCollection(collName, cb) {
  data.getCollection(collName).remove(cb);
}