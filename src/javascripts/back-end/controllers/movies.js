import { List, Movie } from "../models/movie_lists"

// GET /api/movie_lists/:lid/movies
export const allMovieListMoviesAPI = (req, res, next) => {
  List.findOne({
    $and: [
      { _id: req.params.lid },
      { $or: [{ public: true }, { owner: req.user?._id }] },
    ],
  })
    .populate("movies")
    .exec()
    .then((list) => {
      let results = []
      for (let movie of list.movies) {
        let editable =
          req.user?._id.toHexString() === movie.addedBy.toHexString()
        results.push({ doc: movie, editable })
      }
      res.write(
        JSON.stringify({
          list: { id: list.id, title: list.title },
          movies: results,
        })
      )
      res.end()
    })
    .catch((err) => {
      res.json({ success: false, message: "Query failed" })
      res.end()
    })
}

// GET /api/movie_lists/:lid/addable_movies
export const allMoviesNotInMovieLisAPI = (req, res, next) => {
  List.findOne({
    $and: [
      { _id: req.params.lid },
      { $or: [{ public: true }, { owner: req.user?._id }] },
    ],
  })
    .exec()
    .then(async (list) => {
      let addables = await Movie.find({ _id: { $nin: list.movies } })
      let results = []
      for (let movie of addables) {
        results.push({
          id: movie.id,
          title: movie.title,
          poster: movie.poster,
        })
      }
      res.write(
        JSON.stringify({
          list: { id: list.id, title: list.title },
          movies: results,
        })
      )
      res.end()
    })
    .catch((err) => {
      res.json({ success: false, message: "Query failed" })
      res.end()
    })
}

// GET /api/movie_lists/:lid/movies/:mid
export const oneMovieListMovieAPI = (req, res, next) => {
  Movie.findOne({ _id: req.params.mid })
    .exec()
    .then((movie) => {
      res.write(JSON.stringify(movie))
      res.end()
    })
    .catch((err) => {
      es.json({ success: false, message: "Query failed" })
      res.end()
    })
}

// POST /api/movie_lists/:lid/movies
export const createMovieAPI = (req, res, next) => {
  List.findOne({ _id: req.params.lid })
    .populate("movies")
    .exec()
    .then((list) => {
      let movie = new Movie(req.body)
      movie.addedBy = req.user
      movie.addedAt = new Date()
      movie.updatedAt = new Date()
      movie.save(async (err) => {
        if (err) {
          res.json({ success: false, message: "Movie creation failed" })
          res.end()
        } else {
          list.movies.push(movie)
          await list.save()
          res.end()
        }
      })
    })
    .catch((err) => {
      res.json({ success: false, message: "Query failed" })
      res.end()
    })
}

// PUT /api/movie_lists/:lid/movies/add
export const addMoviesToListAPI = (req, res, next) => {
  List.findOne({ _id: req.params.lid })
    .populate("movies")
    .exec()
    .then(async (list) => {
      list.movies.push(...req.body.movies)
      await list.save()
      res.end()
    })
    .catch((err) => {
      res.json({ success: false, message: "Query failed" })
      res.end()
    })
}

// PUT /api/movie_lists/:lid/movies/:mid
export const updateMovieAPI = (req, res, next) => {
  Movie.findOne({ _id: req.params.mid })
    .select("-reviews")
    .exec((err, movie) => {
      if (err) {
        res.json({ success: false, message: "Unable to update" })
        res.end()
      } else {
        Object.assign(movie, req.body)
        movie.updatedAt = new Date()
        movie.save((err) => {
          if (err) {
            res.json({ success: false, message: "Unable to update movie" })
            res.end()
          } else {
            res.end()
          }
        })
      }
    })
}

// POST /api/movie_lists/:lid/movies/:mid/review
export const reviewMovieAPI = (req, res, next) => {
  Movie.findOne({ _id: req.params.mid })
    .exec()
    .then((movie) => {
      let review = {
        comment: req.body.comment,
        postedBy: {
          displayName: req.session.user_profile.displayName,
          user: req.user,
        },
        postedAt: new Date(),
      }
      movie.reviews.push(review)
      movie.save((err) => {
        if (err) {
          res.json({ success: false, message: "Movie creation failed" })
          res.end()
        } else {
          res.write(JSON.stringify(movie.reviews))
          res.end()
        }
      })
    })
    .catch((err) => {
      res.json({ success: false, message: "Query failed" })
      res.end()
    })
}

// DELETE /api/movie_lists/:lid/movies/:mid
export const deleteMovieAPI = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.mid, (err) => {
    if (err) {
      res.json({ success: false, message: "Unable to delete movie" })
      res.end()
    } else {
      res.end()
    }
  })
}

// DELETE /api/movie_lists/:lid/movies/:mid/remove
export const removeMovieFromListAPI = (req, res, next) => {
  List.findOne({ _id: req.params.lid })
    .exec()
    .then(async (list) => {
      let movies = []
      for (let movie of list.movies) {
        if (movie.toHexString() !== req.params.mid) {
          movies.push(movie)
        }
      }

      list.movies = movies
      await list.save()
      res.end()
    })
    .catch((err) => {
      res.json({ success: false, message: "Query failed" })
      res.end()
    })
}
