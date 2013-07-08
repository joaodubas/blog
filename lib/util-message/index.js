var express = require('express');
var app = module.exports = express();

// define a custom res.message() method which stores messages in session
app.response.message = function _message(msg) {
  var session = this.req.session;
  session.messages = session.messages || [];
  session.messages.push(msg);
  return this;
};

// expose "messages" local variable when views are rendered
app.use(function _messages(req, res, next) {
  var messages = req.session.messages || [];
  res.locals.messages = messages;
  res.locals.hasMessages = !!messages.length;
  next();
  // flush messages
  req.session.messages = [];
});
