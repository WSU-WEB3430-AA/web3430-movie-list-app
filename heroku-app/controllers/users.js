"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUserUpAPI = exports.signUserOutAPI = exports.signUserInAPI = exports.currentUserProfileAPI = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _users = require("../models/users");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// POST /api/users/signup
var signUserUpAPI = function signUserUpAPI(req, res, next) {
  var user = new _users.User({
    username: req.body.username,
    email: req.body.email
  });

  _users.User.register(user, req.body.password, /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, user) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!err) {
                _context.next = 4;
                break;
              }

              res.json({
                success: false,
                message: "Your account could not be saved. Error: ",
                err: err
              });
              _context.next = 7;
              break;

            case 4:
              _context.next = 6;
              return new _users.Profile({
                user: user,
                displayName: "".concat(req.body.lastName, ", ").concat(req.body.firstName),
                provider: 'local',
                name: {
                  family: req.body.lastName,
                  given: req.body.firstName
                }
              }).save();

            case 6:
              res.json({
                success: true,
                message: "Your account was successfully created"
              });

            case 7:
              res.end();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}; // POST /api/users/signin


exports.signUserUpAPI = signUserUpAPI;

var signUserInAPI = function signUserInAPI(req, res, next) {
  _passport["default"].authenticate('local', function (err, user, info) {
    if (err) res.status(500);else if (!user) res.status(404);
    req.logIn(user, function (err) {
      if (err) res.status(401);else res.status(200);
    });
    res.end();
  } // (err, user, info) => {
  //   if (err) {
  //     return res.status(500).json('Server error')
  //     // return next(err)
  //   }
  //   if (!user) {
  //     return res.status(404).json("User not found")
  //     // return res.redirect('/signin?info=' + info)
  //   }
  //   req.logIn(user, function(err) {
  //     if (err) {
  //       return res.status(401).json("Invalid credentials")
  //       // return next(err)
  //     }
  //     // return res.status(200)
  //     return res.redirect('/')
  //   })
  // }
  )(req, res, next);
}; // DELETE /api/users/signout


exports.signUserInAPI = signUserInAPI;

var signUserOutAPI = function signUserOutAPI(req, res, next) {
  req.logout();
  req.session.destroy();
  res.end();
}; // GET /api/users/profile


exports.signUserOutAPI = signUserOutAPI;

var currentUserProfileAPI = function currentUserProfileAPI(req, res, next) {
  _users.Profile.findOne({
    user: req.user._id
  }).populate('user').exec().then(function (profile) {
    var results = {
      username: profile.user.username,
      displayName: profile.displayName,
      email: profile.user.email
    };
    res.write(JSON.stringify(results));
    res.end();
  })["catch"](function (err) {
    res.json({
      success: false,
      message: "Query failed"
    });
    res.end();
  });
};

exports.currentUserProfileAPI = currentUserProfileAPI;