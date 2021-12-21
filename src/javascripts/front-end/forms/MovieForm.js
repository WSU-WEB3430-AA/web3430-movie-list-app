import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { MovieListsContext } from '../App'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import Form from './Form'
import { Breadcrumbs } from '../pages/Pages'
import AddableMoviesForm from './AddableMoviesForm'

const validationSchema = yup.object({
  year: yup.number().required().min(1900).max(new Date().getFullYear()),
  title: yup.string().required(),
  poster: yup.string().url().required(),
  plot: yup.string().required(),
  releaseDate: yup.date().required()
})

export default function MovieForm() {
  let { movies, currentList , authenticated, setAuthenticated} = useContext(MovieListsContext)

  if (!authenticated) {
    document.location = '/signin'
    return <></>
  }

  let { mid, lid } = useParams()
  let movie = mid ? movies.find(m => m.id == mid ) : {}
  let is_new = mid === undefined
  const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    initialValues: is_new ? {
      year: new Date().getFullYear(),
      title: "",
      poster: "",
      plot: "",
      releaseDate: "",
      review: ""
    } : {...movie}, 
    validationSchema,
    onSubmit(values){
      fetch(`/api/movie_lists/${currentList.id}/movies${is_new ? '' : '/' + movie.id}` , {
        method: is_new ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(values)
      })
      .then((response) => {
        if(!response.ok)
          throw Error(response.statusText)
      })
      .then(() => {
        toast.success(`Successfully ${is_new ? 'created' : 'updated'}`, {onClose: () => {
          document.location = is_new ? `/movie_lists/${currentList.id}/movies` : `/movie_lists/${currentList.id}/movies/${movie.id}`
        }})
      })
      .catch((error) => {
        toast.error(`Failed to submit your message`)
      });
    }
  })

  return(
    <>
      <Form title={is_new ? 'Adding a new movie' : `Editing ${values.title}`}
            nav={is_new ? <Breadcrumbs list={currentList} page="new"/> : <Breadcrumbs list={currentList} movie={movie} page="edit"/>}
            yup={validationSchema} 
            formik={{handleSubmit, handleChange, values, errors, setFieldValue}} 
            textareas={{plot: 5}}
            onCancel={()=> document.location= is_new ? `/movie_lists/${currentList.id}/movies` : `/movie_lists/${currentList.id}/movies/${movie.id}`}/>

      { is_new && <AddableMoviesForm lid={lid}/> }
    </>
  )
}