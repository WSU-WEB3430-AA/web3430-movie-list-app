"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMovieListAPI = exports.oneMovieListAPI = exports.deleteMovieListAPI = exports.createMovieListAPI = exports.allMovieListsAPI = void 0;

var _movie_lists = require("../models/movie_lists");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// GET /api/movie_lists
var allMovieListsAPI = function allMovieListsAPI(req, res, next) {
  var _req$user;

  _movie_lists.List.find({
    $or: [{
      "public": true
    }, {
      owner: (_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user._id
    }]
  })
  /*.populate('movies')*/
  .exec().then(function (lists) {
    var results = [];

    var _iterator = _createForOfIteratorHelper(lists),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _req$user2;

        var list = _step.value;
        results.push({
          doc: list,
          editable: ((_req$user2 = req.user) === null || _req$user2 === void 0 ? void 0 : _req$user2._id.toHexString()) === list.owner.toHexString()
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    res.write(JSON.stringify(results));
    res.end();
  })["catch"](function (err) {
    res.json({
      success: false,
      message: "Query failed"
    });
    res.end();
  });
}; // GET /api/movie_lists/:lid


exports.allMovieListsAPI = allMovieListsAPI;

var oneMovieListAPI = function oneMovieListAPI(req, res, next) {
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
  }).populate('movies').exec().then(function (list) {
    res.write(JSON.stringify(list));
    res.end();
  })["catch"](function (err) {
    es.json({
      success: false,
      message: "Query failed"
    });
    res.end();
  });
}; // POST /api/movie_lists


exports.oneMovieListAPI = oneMovieListAPI;

var createMovieListAPI = function createMovieListAPI(req, res, next) {
  var list = new _movie_lists.List(req.body);
  list.owner = req.user;
  list.votes = 0;
  list.createdAt = new Date();
  list.updatedAt = new Date();
  list.save(function (err) {
    if (err) {
      res.json({
        success: false,
        message: "Movie list creation failed"
      });
      res.end();
    } else {
      res.end();
    }
  });
}; // PUT /api/movie_lists/:lid


exports.createMovieListAPI = createMovieListAPI;

var updateMovieListAPI = function updateMovieListAPI(req, res, next) {
  _movie_lists.List.findOne({
    _id: req.params.lid
  }).exec().then(function (list) {
    Object.assign(list, req.body); // list.owner = req.user._id

    list.updatedAt = new Date();
    list.save(function (err) {
      if (err) {
        res.json({
          success: false,
          message: "Unable to update movie list"
        });
        res.end();
      } else {
        res.end();
      }
    });
  })["catch"](function (err) {
    res.json({
      success: false,
      message: "Unable to find movie list"
    });
    res.end();
  });
}; // DELETE /api/movie_lists/:lid


exports.updateMovieListAPI = updateMovieListAPI;

var deleteMovieListAPI = function deleteMovieListAPI(req, res, next) {
  _movie_lists.List.findByIdAndDelete(req.params.lid, function (err) {
    if (err) {
      res.json({
        success: false,
        message: "Unable to delete movie list"
      });
      res.end();
    } else {
      res.end();
    }
  });
};

exports.deleteMovieListAPI = deleteMovieListAPI;