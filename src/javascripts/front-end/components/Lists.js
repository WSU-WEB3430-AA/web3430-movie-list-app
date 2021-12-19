import React, { useEffect, useContext } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { MovieListsContext } from './App'
import ListItem from './ListItem'

export default function Lists(props) {
  const {lists, setLists, authenticated, setAuthenticated} = useContext(MovieListsContext)
  // let navigate = useNavigate()

  // useEffect(() => {
  //   fetch('/api/movie_lists', {
  //       method: 'GET', 
  //       headers: {
  //         'Content-Type': 'application/json'          
  //       },
  //       credentials: 'same-origin'
  //     })
  //     .then(response => response.text())
  //     .then(data => {
  //       setLists(JSON.parse(data, (key, value) => {
  //         const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/
  //         if (typeof value === "string" && dateFormat.test(value)) {
  //           return new Date(value)
  //         }

  //         return value
  //       }))})
  //     .catch(console.error)
  // }, [])

  // if(!lists)
  //   return <p>Loading...</p>

  return (
    <div className="mx-5">
      <div className="row mt-3 pb-4 border-bottom">
        <div className="col-7"><h3>Movie Lists</h3></div>
        <div className="col-3">
          {/* <select className="form-select" onChange={(e) => sortBy(e.target.value)}>
            <option defaultValue="">Sort movies by:</option>
            <option value="title">Title</option>
            <option value="releaseDate">Release date</option>
            <option value="rating">Rating</option>
          </select> */}
        </div>
        <div className="col-2 d-grid">
          <Link to="/movie_lists/new" className="btn btn-primary"><FaPlus/> Add new list</Link>
        </div>
      </div>

      <div>
        {
          lists.map((l, i) => (
            <ListItem key={i} list={l} index={i} />
          ))
        }
      </div>
    </div>
  )
}