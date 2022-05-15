import { List } from "../models/movie_lists"

// GET /api/movie_lists
export const allMovieListsAPI = (req, res, next) => {
  List.find({
    $or: [{ public: true }, { owner: req.user?._id }],
  }) /*.populate('movies')*/
    .exec()
    .then((lists) => {
      let results = []
      for (let list of lists) {
        results.push({
          doc: list,
          editable: req.user?._id.toHexString() === list.owner.toHexString(),
        })
      }

      res.write(JSON.stringify(results))
      res.end()
    })
    .catch((err) => {
      res.json({ success: false, message: "Query failed" })
      res.end()
    })
}

// GET /api/movie_lists/:lid
export const oneMovieListAPI = (req, res, next) => {
  List.findOne({
    $and: [
      { _id: req.params.lid },
      { $or: [{ public: true }, { owner: req.user?._id }] },
    ],
  })
    .populate("movies")
    .exec()
    .then((list) => {
      res.write(JSON.stringify(list))
      res.end()
    })
    .catch((err) => {
      es.json({ success: false, message: "Query failed" })
      res.end()
    })
}

// POST /api/movie_lists
export const createMovieListAPI = (req, res, next) => {
  let list = new List(req.body)
  list.owner = req.user
  list.votes = 0
  list.createdAt = new Date()
  list.updatedAt = new Date()
  list.save((err) => {
    if (err) {
      res.json({ success: false, message: "Movie list creation failed" })
      res.end()
    } else {
      res.end()
    }
  })
}

// PUT /api/movie_lists/:lid
export const updateMovieListAPI = (req, res, next) => {
  List.findOne({ _id: req.params.lid })
    .exec()
    .then((list) => {
      Object.assign(list, req.body)
      // list.owner = req.user._id
      list.updatedAt = new Date()
      list.save((err) => {
        if (err) {
          res.json({ success: false, message: "Unable to update movie list" })
          res.end()
        } else {
          res.end()
        }
      })
    })
    .catch((err) => {
      res.json({ success: false, message: "Unable to find movie list" })
      res.end()
    })
}

// DELETE /api/movie_lists/:lid
export const deleteMovieListAPI = (req, res, next) => {
  List.findByIdAndDelete(req.params.lid, (err) => {
    if (err) {
      res.json({ success: false, message: "Unable to delete movie list" })
      res.end()
    } else {
      res.end()
    }
  })
}
