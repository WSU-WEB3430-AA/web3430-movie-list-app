"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passport = _interopRequireDefault(require("passport"));

var _users = require("./models/users");

var _routes = require("./routes");

var path = require('path');

require('dotenv').config(); // // To make async/await calls work
// import "core-js/stable"
// import "regenerator-runtime/runtime"
// Connect to the database


_mongoose["default"].connect(process.env.DB_URL).then(function (db) {
  console.log("Connected to ".concat(db.connections[0].name));
})["catch"](function (err) {
  console.log(err);
}); // Creating the application


var express = require('express');

var app = express(); // App security

exports.app = app;

var helmet = require("helmet");

app.use(helmet({
  contentSecurityPolicy: false
})); // View templates

app.locals.app_title = "Movie Lists App";
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // Logger

var logger = require('morgan');

app.use(logger('dev')); // Static files

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express["static"](path.join(__dirname, 'public'))); // Sessions

var session = require('express-session');

app.use(session({
  secret: process.env.APP_SECRET,
  resave: false,
  saveUninitialized: false
})); // Authentication

_passport["default"].use(_users.User.createStrategy());

_passport["default"].serializeUser(_users.User.serializeUser());

_passport["default"].deserializeUser(_users.User.deserializeUser());

app.use(_passport["default"].initialize());
app.use(_passport["default"].session()); // Routing

(0, _routes.configureRoutes)(app); // Handling errors
// Page not found errors

app.use(function (req, res, next) {
  var err = new Error("Page \"".concat(req.path, "\" not found"));
  err.status = 404;
  next(err);
}); // Error handler

app.use(function (err, req, res, next) {
  if (!err.status || err.status == '') {
    err.status = 500;
  }

  res.status(err.status || 500);
  res.render('error', {
    err: err
  });
}); //Starting the server

var server = require("http").createServer(app);

var port = process.env.PORT || '8080';
server.on('error', function (err) {
  if (err.syscall !== 'listen') {
    throw err;
  }

  switch (err.code) {
    case 'EACCES':
      console.error("Port ".concat(port, " requires elevated privileges"));
      process.exit(1);

    case 'EADDRINUSE':
      console.error("Port ".concat(port, " is already in use"));
      process.exit(1);

    default:
      throw err;
  }
});
server.listen(port, function () {
  console.log("Server started at port ".concat(port));
});