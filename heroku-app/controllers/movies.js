"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMovieAPI = exports.reviewMovieAPI = exports.removeMovieFromListAPI = exports.oneMovieListMovieAPI = exports.deleteMovieAPI = exports.createMovieAPI = exports.allMoviesNotInMovieLisAPI = exports.allMovieListMoviesAPI = exports.addMoviesToListAPI = void 0;

var _movie_lists = require("../models/movie_lists");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// GET /api/movie_lists/:lid/movies
var allMovieListMoviesAPI = function allMovieListMoviesAPI(req, res, next) {
  var _req$user;

  _movie_lists.List.findOne({
    $and: [{
      _id: req.params.lid
    }, {
      $or: [{
        "public": true
      }, {
        owner: (_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user._id
      }]
    }]
  }).populate('movies').exec().then(function (list) {
    var results = [];

    var _iterator = _createForOfIteratorHelper(list.movies),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _req$user2;

        var movie = _step.value;
        var editable = ((_req$user2 = req.user) === null || _req$user2 === void 0 ? void 0 : _req$user2._id.toHexString()) === movie.addedBy.toHexString();
        results.push({
          doc: movie,
          editable: editable
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    res.write(JSON.stringify({
      list: {
        id: list.id,
        title: list.title
      },
      movies: results
    }));
    res.end();
  })["catch"](function (err) {
    res.json({
      success: false,
      message: "Query failed"
    });
    res.end();
  });
}; // GET /api/movie_lists/:lid/addable_movies


exports.allMovieListMoviesAPI = allMovieListMoviesAPI;

var allMoviesNotInMovieLisAPI = function allMoviesNotInMovieLisAPI(req, res, next) {
  var _req$user3;

  _movie_lists.List.findOne({
    $and: [{
      _id: req.params.lid
    }, {
      $or: [{
        "public": true
      }, {
        owner: (_req$user3 = req.user) === null || _req$user3 === void 0 ? void 0 : _req$user3._id
      }]
    }]
  }).exec().then( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(list) {
      var addables, results, _iterator2, _step2, movie;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _movie_lists.Movie.find({
                _id: {
                  $nin: list.movies
                }
              });

            case 2:
              addables = _context.sent;
              results = [];
              _iterator2 = _createForOfIteratorHelper(addables);

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  movie = _step2.value;
                  results.push({
                    id: movie.id,
                    title: movie.title,
                    poster: movie.poster
                  });
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }

              res.write(JSON.stringify({
                list: {
                  id: list.id,
                  title: list.title
                },
                movies: results
              }));
              res.end();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }())["catch"](function (err) {
    res.json({
      success: false,
      message: "Query failed"
    });
    res.end();
  });
}; // GET /api/movie_lists/:lid/movies/:mid


exports.allMoviesNotInMovieLisAPI = allMoviesNotInMovieLisAPI;

var oneMovieListMovieAPI = function oneMovieListMovieAPI(req, res, next) {
  _movie_lists.Movie.findOne({
    _id: req.params.mid
  }).exec().then(function (movie) {
    res.write(JSON.stringify(movie));
    res.end();
  })["catch"](function (err) {
    es.json({
      success: false,
      message: "Query failed"
    });
    res.end();
  });
}; // POST /api/movie_lists/:lid/movies


exports.oneMovieListMovieAPI = oneMovieListMovieAPI;

var createMovieAPI = function createMovieAPI(req, res, next) {
  _movie_lists.List.findOne({
    _id: req.params.lid
  }).populate('movies').exec().then(function (list) {
    var movie = new _movie_lists.Movie(req.body);
    movie.addedBy = req.user;
    movie.addedAt = new Date();
    movie.updatedAt = new Date();
    movie.save( /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!err) {
                  _context2.next = 5;
                  break;
                }

                res.json({
                  success: false,
                  message: "Movie creation failed"
                });
                res.end();
                _context2.next = 9;
                break;

              case 5:
                list.movies.push(movie);
                _context2.next = 8;
                return list.save();

              case 8:
                res.end();

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
  })["catch"](function (err) {
    res.json({
      success: false,
      message: "Query failed"
    });
    res.end();
  });
}; // PUT /api/movie_lists/:lid/movies/add


exports.createMovieAPI = createMovieAPI;

var addMoviesToListAPI = function addMoviesToListAPI(req, res, next) {
  _movie_lists.List.findOne({
    _id: req.params.lid
  }).populate('movies').exec().then( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(list) {
      var _list$movies;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              (_list$movies = list.movies).push.apply(_list$movies, _toConsumableArray(req.body.movies));

              _context3.next = 3;
              return list.save();

            case 3:
              res.end();

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }())["catch"](function (err) {
    res.json({
      success: false,
      message: "Query failed"
    });
    res.end();
  });
}; // PUT /api/movie_lists/:lid/movies/:mid


exports.addMoviesToListAPI = addMoviesToListAPI;

var updateMovieAPI = function updateMovieAPI(req, res, next) {
  _movie_lists.Movie.findOne({
    _id: req.params.mid
  }).select('-reviews').exec(function (err, movie) {
    if (err) {
      res.json({
        success: false,
        message: "Unable to update"
      });
      res.end();
    } else {
      Object.assign(movie, req.body);
      movie.updatedAt = new Date();
      movie.save(function (err) {
        if (err) {
          res.json({
            success: false,
            message: "Unable to update movie"
          });
          res.end();
        } else {
          res.end();
        }
      });
    }
  });
}; // POST /api/movie_lists/:lid/movies/:mid/review


exports.updateMovieAPI = updateMovieAPI;

var reviewMovieAPI = function reviewMovieAPI(req, res, next) {
  _movie_lists.Movie.findOne({
    _id: req.params.mid
  }).exec().then(function (movie) {
    var review = {
      comment: req.body.comment,
      postedBy: {
        displayName: req.session.user_profile.displayName,
        user: req.user
      },
      postedAt: new Date()
    };
    movie.reviews.push(review);
    movie.save(function (err) {
      if (err) {
        res.json({
          success: false,
          message: "Movie creation failed"
        });
        res.end();
      } else {
        res.write(JSON.stringify(movie.reviews));
        res.end();
      }
    });
  })["catch"](function (err) {
    res.json({
      success: false,
      message: "Query failed"
    });
    res.end();
  });
}; // DELETE /api/movie_lists/:lid/movies/:mid


exports.reviewMovieAPI = reviewMovieAPI;

var deleteMovieAPI = function deleteMovieAPI(req, res, next) {
  _movie_lists.Movie.findByIdAndDelete(req.params.mid, function (err) {
    if (err) {
      res.json({
        success: false,
        message: "Unable to delete movie"
      });
      res.end();
    } else {
      res.end();
    }
  });
}; // DELETE /api/movie_lists/:lid/movies/:mid/remove


exports.deleteMovieAPI = deleteMovieAPI;

var removeMovieFromListAPI = function removeMovieFromListAPI(req, res, next) {
  _movie_lists.List.findOne({
    _id: req.params.lid
  }).exec().then( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(list) {
      var movies, _iterator3, _step3, movie;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              movies = [];
              _iterator3 = _createForOfIteratorHelper(list.movies);

              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  movie = _step3.value;

                  if (movie.toHexString() !== req.params.mid) {
                    movies.push(movie);
                  }
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }

              list.movies = movies;
              _context4.next = 6;
              return list.save();

            case 6:
              res.end();

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }())["catch"](function (err) {
    res.json({
      success: false,
      message: "Query failed"
    });
    res.end();
  });
};

exports.removeMovieFromListAPI = removeMovieFromListAPI;