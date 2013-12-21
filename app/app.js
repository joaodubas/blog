#!/usr/bin/env node
var path = require('path');
var express = require('express');

var app = module.exports = express();

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// session support
app.use(express.cookieParser('i4mf4tty4ndh4ppy'));
app.use(express.session());

var boot = require('./lib/boot.js');
app.use(boot);

app.listen(Number(process.env.PORT || '16152'));
