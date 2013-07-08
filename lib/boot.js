var express = require('express');
var app = module.exports = express();

var utilMessage = require('util-message');
var utilNavigation = require('util-nav');
var controlMain = require('control-main');

app.use(utilMessage);
app.use(utilNavigation);
app.use(controlMain);
