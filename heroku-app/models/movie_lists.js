"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movie = exports.List = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema; // Movies can be reviewed

var reviewSchema = new Schema({
  comment: String,
  postedBy: {
    displayName: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  postedAt: Date
});
reviewSchema.set('toJSON', {
  virtuals: true,
  transform: function transform(doc, ret, options) {
    delete ret.__v;
    delete ret._id;
    delete ret.postedBy.user;
  }
}); // A movie can have zero or more reviews (one-2-many relationship)

var movieSchema = new Schema({
  title: String,
  plot: String,
  poster: String,
  rated: String,
  rating: Number,
  votes: Number,
  genre: String,
  year: Number,
  releaseDate: Date,
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  addedAt: Date,
  updatedAt: Date,
  reviews: [reviewSchema]
}); // A list can have zero or more movies (one-2-many relationship)

var listSchema = new Schema({
  title: String,
  description: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  "public": Boolean,
  votes: Number,
  createdAt: Date,
  updatedAt: Date,
  movies: [{
    type: Schema.Types.ObjectId,
    ref: "Movie"
  }]
});

for (var _i = 0, _arr = [movieSchema, listSchema]; _i < _arr.length; _i++) {
  var schema = _arr[_i];
  schema.virtual('id').get(function () {
    return this._id.toHexString();
  });
  schema.set('toJSON', {
    virtuals: true,
    transform: function transform(doc, ret, options) {
      delete ret.__v;
      delete ret._id;
      delete ret.owner;
      delete ret.addedBy;
    }
  });
} // export let Review = mongoose.model("Review", reviewSchema)


var Movie = _mongoose["default"].model("Movie", movieSchema);

exports.Movie = Movie;

var List = _mongoose["default"].model("List", listSchema);

exports.List = List;