import { List, Movie } from '../models/movie_lists'

// GET /api/movie_lists/:lid/movies
export const allMovieListMoviesAPI = (req, res, next) => {
  List.findOne({$and: [{_id: req.params.lid}, {$or:[{public: true}, {owner: req.user?._id}]}]}).populate('movies').exec().then(list=> {
    res.write(JSON.stringify({list: {id: list.id, title: list.title}, movies: list.movies}))
    res.end()
  }).catch(err => {
    res.json({success: false, message: "Query failed"})
    res.end()
  })
}

// GET /api/movie_lists/:lid/movies/:mid
export const oneMovieListMovieAPI = (req, res, next) => {
  Movie.findOne({_id: req.params.mid}).exec().then(movie=> {
    res.write(JSON.stringify(movie))
    res.end()
  }).catch(err => {
    es.json({success: false, message: "Query failed"})
    res.end()
  })
}

// POST /api/movie_lists/:lid/movies
export const createMovieAPI = (req, res, next) => {
  List.findOne({_id: req.params.lid}).populate('movies').exec().then(list=> {
    let movie = new Movie(req.body)
    movie.addedBy = req.user
    movie.addedAt = new Date()
    movie.updatedAt = new Date()
    movie.save(async err=> {
      if(err){
        res.json({success: false, message: "Movie creation failed"})
        res.end()
      }else{
        list.movies.push(movie)
        await list.save()
        res.end()
      }
    })
  }).catch(err => {
    res.json({success: false, message: "Query failed"})
    res.end()
  })
}

// PUT /api/movie_lists/:lid/movies/:mid
export const updateMovieAPI = (req, res, next) => {
  Movie.findOne({_id: req.params.mid}).select('-reviews').exec((err, movie)=> {
    if(err){
      res.json({success: false, message: "Unable to update"})
      res.end()
    }else{
      Object.assign(movie, req.body)
      movie.updatedAt = new Date()
      movie.save(err=> {
        if(err){
          res.json({success: false, message: "Unable to update movie"})
          res.end()
        }else{
          res.end()
        }
      })
    }
  })
}

// POST /api/movie_lists/:lid/movies/:mid/review
export const reviewMovieAPI = (req, res, next) => {
  Movie.findOne({_id: req.params.mid}).exec().then(movie=> {
    let review = {
      comment: req.body.comment,
      postedBy: req.user,
      postedAt: new Date()
    }
    movie.reviews.push(review)
    movie.save(err=> {
      if(err){
        res.json({success: false, message: "Movie creation failed"})
        res.end()
      }else{
        res.write(JSON.stringify(movie.reviews))
        res.end()
      }
    })
  }).catch(err => {
    res.json({success: false, message: "Query failed"})
    res.end()
  })
}

// DELETE /api/movie_lists/:lid/movies/:mid
export const deleteMovieAPI = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.mid, err=> {
    if(err){
      res.json({success: false, message: "Unable to delete movie"})
      res.end()
    }else{
      res.end()
    }
  })
}