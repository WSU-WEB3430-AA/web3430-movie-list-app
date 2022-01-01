"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _movie_lists = require("./models/movie_lists");

var _top = require("../front-end/config/top10");

var _users = require("./models/users");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var path = require('path');

require('dotenv').config(); // Connect to the database


console.log(process.env.DB_URL);

_mongoose["default"].connect(process.env.DB_URL).then(function (db) {
  console.log("Connected to ".concat(db.connections[0].name));
})["catch"](function (err) {
  console.log(err);
});

// STEP 1: Create a user
console.log('STEP 1: Creating the user');
var user = new _users.User({
  username: 'ww',
  email: 'ww@example.com'
});

_users.User.register(user, 'ww', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, user) {
    var _iterator, _step, m, movie;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!err) {
              _context.next = 4;
              break;
            }

            console.log(err);
            _context.next = 29;
            break;

          case 4:
            _context.next = 6;
            return new _users.Profile({
              user: user,
              provider: 'local',
              displayName: 'Williams, Will',
              name: {
                family: 'Williams',
                given: 'Will'
              }
            }).save();

          case 6:
            console.log('....... DONE!'); // STEP 2: Add the top 10 IMDB movies

            console.log('STEP 2: Adding the top 10 IMDB movies');
            _iterator = _createForOfIteratorHelper(_top.top10);
            _context.prev = 9;

            _iterator.s();

          case 11:
            if ((_step = _iterator.n()).done) {
              _context.next = 18;
              break;
            }

            m = _step.value;
            movie = new _movie_lists.Movie({
              "title": m.title,
              "year": m.year,
              "rated": m.rated,
              "genre": m.genre,
              "plot": m.plot,
              "poster": m.poster,
              "rating": m.rating,
              "votes": m.votes,
              "releaseDate": m.releaseDate,
              addedBy: user,
              addedAt: new Date(),
              updatedAt: new Date(),
              "reviews": []
            });
            _context.next = 16;
            return movie.save();

          case 16:
            _context.next = 11;
            break;

          case 18:
            _context.next = 23;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](9);

            _iterator.e(_context.t0);

          case 23:
            _context.prev = 23;

            _iterator.f();

            return _context.finish(23);

          case 26:
            console.log('....... DONE!'); // STEP 3: Create a list containing the top 10 IMDB movies

            console.log('STEP 3: Creating a list containing the top 10 IMDB movies');

            _movie_lists.Movie.find().exec().then(function (movies) {
              var list = new _movie_lists.List({
                title: 'Top 10 IMDB Movies',
                description: 'Top 10 IMDB movies of all time as rated by regular IMDB voters.',
                owner: user,
                "public": true,
                votes: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
                movies: movies
              });
              list.save(function (err) {
                if (err) {
                  console.log(err);
                }

                console.log('....... DONE!');
              });
            });

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 20, 23, 26]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // Movie.find().exec().then(movies=> {
//    let list = new List({
//      title: 'Top 10 IMDB Movies',
//      description: 'Top 10 IMDB movies of all time as rated by regular IMDb voters.',
//      public: true,
//     votes: 0,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     movies: movies
//   })
//   list.save(err =>{
//     if(err){
//       console.log(err)
//     }
//   })
// })
// List.find().populate('movies').exec().then(list=> {
//   console.log(list[0].movies)
// })