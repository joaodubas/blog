const fs = require('fs');
const path = require('path');
const data = require('../lib/data.js');
const util = require('./util');

describe('data', function () {
  describe('database', function () {
    it('provide a database', function () {
      expect(data.db).to.exist;
    });

    it('provide a opened database', function () {
      expect(data.db.isOpen()).to.be.true;
    });

    it('provide access methods', function () {
      var methods = data.db.methods;
      expect(methods).to.contain.keys('get', 'put', 'del');
    });

    it('provide direct access to `get`, `put`, `del`', function () {
      expect(data).to.contain.keys('get', 'put', 'del');
    });
  });
});
