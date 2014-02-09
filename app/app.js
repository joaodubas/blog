#!/usr/local/bin/node --harmony
const path = require('path');
const express = require('express');

const app = module.exports = express();

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// session support
app.use(express.cookieParser('14mf4tty4ndh4ppy'));
app.use(express.session());

const boot = require('./lib/boot.js');
app.use(boot);

app.listen(Number(process.env.PORT || '16152'));
