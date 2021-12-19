import React, { useContext } from 'react'
import StarRating from './StarRating'
import { Link, useParams } from 'react-router-dom'
import {format} from 'date-fns'
import { DeleteModal } from './DeleteModal'
import { MovieListsContext } from './App'
import { Breadcrumbs } from './Pages'
import MovieReviews from './MovieReviews'

export default function Movie(props){
  let { movies, currentList} = useContext(MovieListsContext)
  let { mid } = useParams()
  let movie = mid ? movies.find(m => m.id == mid ) : {}
  
  return (
    <div className="mx-5">
      <Breadcrumbs list={currentList} movie={movie}></Breadcrumbs>
      <div className="row mt-3 pb-4 border-bottom">
        <div className="col-9"><h3>{movie.title}</h3></div>
        <div className="col-3">
          <div className="row">
            <div className="col d-grid">
              <Link to={`/movie_lists/${currentList.id}/movies/${movie.id}/edit`} className="btn btn-secondary">Edit</Link>
            </div>
            <div className="col d-grid">
              <DeleteModal index={movie.id} list={currentList} movie={movie} page={movie.title}></DeleteModal>
              <a data-bs-toggle="modal" data-bs-target={`#deleteMovieModal_${movie.id}`} className="btn btn-danger">Delete</a>
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix mt-4">
        <img src={movie.poster} className="w-25 float-end" alt={movie.title }/>
        {/* <h2 className="card-title">{ movie.title}</h2> */}
        <p className="card-text">{ movie.plot }</p>
        <p><strong>Rating</strong>: <StarRating rating={movie.rating}/> { movie.rating }</p>
        <p><strong>Votes</strong>: <strong>{movie.votes}</strong></p>
        <p><strong>Rated</strong>: <strong>{movie.rated}</strong></p>
        <p><strong>Genre</strong>: {movie.genre}</p>
        <p><strong>Release date</strong>: {format(movie.releaseDate, "MM/dd/yyyy")}</p>
      </div>

      <div>
        <MovieReviews list={currentList} movie={movie}/>
      </div>
    </div>
  )
}
