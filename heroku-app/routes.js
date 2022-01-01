"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureRoutes = configureRoutes;

var _express = _interopRequireDefault(require("express"));

var _pages = require("./controllers/pages");

var _users = require("./controllers/users");

var _contacts = require("./controllers/contacts");

var _movie_lists = require("./controllers/movie_lists");

var _movies = require("./controllers/movies");

var _users2 = require("./models/users");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

function isSignedIn(req) {
  return req.isAuthenticated && req.isAuthenticated();
}

function requireSignIn(req, res, next) {
  if (isSignedIn(req)) {
    next();
  } else {
    res.status(401).json("unauthorized request");
    res.end();
  }
}

function configureRoutes(app) {
  app.all('*', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              app.locals.signedIn = isSignedIn(req);

              if (!isSignedIn(req)) {
                _context.next = 7;
                break;
              }

              if (req.session.user_profile) {
                _context.next = 6;
                break;
              }

              _context.next = 5;
              return _users2.Profile.findOne({
                user: req.user
              }).exec();

            case 5:
              req.session.user_profile = _context.sent;

            case 6:
              app.locals.displayName = req.session.user_profile.displayName;

            case 7:
              res.cookie("authenticated", app.locals.signedIn);
              next();

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  /*****************************************************************************
   * Section 1: Rendered pages
   ****************************************************************************/
  // Rendered Pages

  router.get('', function (req, res) {
    return res.redirect(301, '/movie_lists');
  });
  router.get('/about', _pages.aboutPage);
  router.get('/contact', _pages.contactPage);
  router.get('/signin', _pages.signInPage);
  router.get('/signup', _pages.signUpPage);
  router.get('/profile', _pages.profilePage);
  router.get('/movie_lists*', _pages.indexPage);
  router.get('/movie_lists/:lid/movies', _pages.indexPage);
  /*****************************************************************************
   * Section 1: API endpoints
   ****************************************************************************/
  // Users

  router.post('/api/users/signup', _users.signUserUpAPI);
  router.post('/api/users/signin', _users.signUserInAPI);
  router.get('/api/users/profile', requireSignIn, _users.currentUserProfileAPI);
  router["delete"]('/api/users/signout', _users.signUserOutAPI); // Contacts

  router.get('/api/contacts', _contacts.allContactsAPI);
  router.post('/api/contacts', _contacts.newContactAPI);
  router.put('/api/contacts/:cid/close', _contacts.closeContactAPI); // Movie lists

  router.get('/api/movie_lists', _movie_lists.allMovieListsAPI);
  router.get('/api/movie_lists/:lid', _movie_lists.oneMovieListAPI);
  router.post('/api/movie_lists', requireSignIn, _movie_lists.createMovieListAPI);
  router.put('/api/movie_lists/:lid', requireSignIn, _movie_lists.updateMovieListAPI);
  router["delete"]('/api/movie_lists/:lid', requireSignIn, _movie_lists.deleteMovieListAPI); // Movies

  router.get('/api/movie_lists/:lid/movies', _movies.allMovieListMoviesAPI);
  router.get('/api/movie_lists/:lid/movies/:mid', _movies.oneMovieListMovieAPI);
  router.get('/api/movie_lists/:lid/addable_movies', _movies.allMoviesNotInMovieLisAPI);
  router.post('/api/movie_lists/:lid/movies', requireSignIn, _movies.createMovieAPI);
  router.put('/api/movie_lists/:lid/movies/add', requireSignIn, _movies.addMoviesToListAPI);
  router.put('/api/movie_lists/:lid/movies/:mid', requireSignIn, _movies.updateMovieAPI);
  router["delete"]('/api/movie_lists/:lid/movies/:mid', requireSignIn, _movies.deleteMovieAPI);
  router["delete"]('/api/movie_lists/:lid/movies/:mid/remove', requireSignIn, _movies.removeMovieFromListAPI);
  router.post('/api/movie_lists/:lid/movies/:mid/review', requireSignIn, _movies.reviewMovieAPI);
  app.use('/', router);
}