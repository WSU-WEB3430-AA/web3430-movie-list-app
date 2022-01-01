"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUserUpAPI = exports.signUserOutAPI = exports.signUserInAPI = exports.currentUserProfileAPI = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = _interopRequireDefault(require("passport"));

var _users = require("../models/users");

// POST /api/users/signup
var signUserUpAPI = function signUserUpAPI(req, res, next) {
  var user = new _users.User({
    username: req.body.username,
    email: req.body.email
  });

  _users.User.register(user, req.body.password, /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, user) {
      return _regenerator["default"].wrap(function _callee$(_context) {
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