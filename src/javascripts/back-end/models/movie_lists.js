import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Movies can be reviewed
let reviewSchema = new Schema({
  comment: String,
  postedBy: {displayName: String, user: { type: Schema.Types.ObjectId, ref: "User" }},
  postedAt: Date
})

reviewSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret.__v
    delete ret._id
    delete ret.postedBy.user
  }
})
// A movie can have zero or more reviews (one-2-many relationship)
let movieSchema = new Schema({
  title: String,
  plot: String,
  poster: String,
  rated: String,
  rating: Number,
  votes: Number,
  genre: String,
  year: Number,
  releaseDate: Date,
  addedBy: { type: Schema.Types.ObjectId, ref: "User" },
  addedAt: Date,
  updatedAt: Date,
  reviews: [reviewSchema]
})

// A list can have zero or more movies (one-2-many relationship)
let listSchema = new Schema({
  title: String,
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  public: Boolean,
  votes: Number,
  createdAt: Date,
  updatedAt: Date,
  movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }]
})

for (let schema of [movieSchema, listSchema]) {
  schema.virtual('id').get(function () {
    return this._id.toHexString()
  })

  schema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
      delete ret.__v
      delete ret._id
      delete ret.owner
      delete ret.addedBy
    }
  })
}

// export let Review = mongoose.model("Review", reviewSchema)
export let Movie = mongoose.model("Movie", movieSchema)
export let List = mongoose.model("List", listSchema)