import React from 'react'
import { Link } from 'react-router-dom'

export function Breadcrumbs({list, movie, page}){
  let items = [
    <li  key={0} className="breadcrumb-item"><Link to={`/movie_lists`}>All</Link></li>,
  ]

  if(movie){
    items.push(<li key={items.length} className="breadcrumb-item"><Link to={`/movie_lists/${list.id}/movies`}>{list.title}</Link></li>)
    if(page){
      items.push(<li key={items.length} className="breadcrumb-item"><Link to={`/movie_lists/${list.id}/movies/${movie.id}`}>{movie.title}</Link></li>)
      items.push(<li key={items.length} className="breadcrumb-item active">{page}</li>)
    } else {
      items.push(<li key={items.length} className="breadcrumb-item active">{movie.title}</li>)
    }
  } else {
    if(page){
      items.push(<li key={items.length} className="breadcrumb-item"><Link to={`/movie_lists/${list.id}/movies`}>{list.title}</Link></li>)
      items.push(<li key={items.length} className="breadcrumb-item active">{page}</li>)
    } else {
      items.push(<li key={items.length} className="breadcrumb-item active">{list.title}</li>)
    }
  }

  return (
    <nav>
      <ol className="breadcrumb">
        { items }
      </ol>
    </nav>
  )
}

export function About(){
  return (
    <>
      <h1>About this list</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, odit eligendi adipisci eius ex, accusamus perferendis nobis, explicabo ab ea consequuntur quisquam inventore eum nulla assumenda esse est ipsam sit.</p>
    </>
  )
}

export function Contact(){
  return (
    <>
      <h1>Contact us</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, odit eligendi adipisci eius ex, accusamus perferendis nobis, explicabo ab ea consequuntur quisquam inventore eum nulla assumenda esse est ipsam sit.</p>
    </>
  )
}

export function Error401(){
  return (
    <>
    <h1>Oops! Page not found</h1>
    <p>The page you tried to access does not exist!</p>
    </>
  )
}