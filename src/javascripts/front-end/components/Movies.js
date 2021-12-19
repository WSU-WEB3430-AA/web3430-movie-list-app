import React, { useEffect, useContext } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MovieListsContext } from './App'
import MovieItem from './MovieItem'
import { Breadcrumbs } from './Pages'

export default function Movies() {
  const {movies, setMovies, currentList} = useContext(MovieListsContext)
  const sortBy = (field) => {
    if(field === "releaseDate"){ // Date descendingly
      // Either
      // movies.sort((a, b) => b[field].toISOString().localeCompare(a[field].toISOString()))

      // or
      movies.sort((a, b) => b[field].getTime() - a[field].getTime())
    } else if(field === "rating"){ // Number
      movies.sort((a, b) => b[field] - a[field])
    } else if(field === "title"){ // String
      movies.sort((a, b) => a[field].localeCompare(b[field]))
    }

    setMovies([...movies])
  }

  if(!movies || !currentList)
    return <p>Loading...</p>

  return (
    <div className="mx-5">
      <Breadcrumbs list={currentList}></Breadcrumbs>
      <div className="row mt-3 pb-4 border-bottom">
        <div className="col-7"><h3>Movies</h3></div>
        <div className="col-3">
          <select className="form-select" onChange={(e) => sortBy(e.target.value)}>
            <option defaultValue="">Sort movies by:</option>
            <option value="title">Title</option>
            <option value="releaseDate">Release date</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div className="col-2 d-grid">
          <Link to={`/movie_lists/${currentList.id}/movies/new`} className="btn btn-primary"><FaPlus/> Add new movie</Link>
        </div>
      </div>

      <div>
        {
          movies.map((m, i) => (
            <MovieItem key={m.id} movie={m} index={i} onLike={() => {
              movies[i].likes = movies[i].likes ? movies[i].likes + 1 : 1

              setMovies(movies.map(m => m))
            }} />
          ))
        }
      </div>
    </div>
  )
}