const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const AssertionError = chai.AssertionError;
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

global.chai = chai;
global.sinon = sinon;
global.expect = expect;
global.AssertionError = AssertionError;
