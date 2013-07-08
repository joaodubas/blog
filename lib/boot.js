var express = require('express');
var app = module.exports = express();

var utilMessage = require('util-message');
var utilNavigation = require('util-nav');
var controlMain = require('control-main');
var controlPost = require('control-post');

app.use(utilMessage);
app.use(utilNavigation);
app.use(controlMain);
app.use(controlPost);
