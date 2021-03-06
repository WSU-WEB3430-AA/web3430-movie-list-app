import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
// import Identicon from 'react-identicons'
import { MovieListsContext } from '../App'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import Form from './Form'
import { formatRelative } from 'date-fns'
import Avatar from 'react-avatar'

const validationSchema = yup.object({
  comment: yup.string().required()
})

export default function MovieReviews({list, movie}) {
  let { authenticated } = useContext(MovieListsContext)
  let [reviews, setReviews] = useState(movie.reviews)

  const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    initialValues: {
      comment: ""
    }, 
    validationSchema,
    onSubmit(values, actions){
      fetch(`/api/movie_lists/${list.id}/movies/${ movie.id}/review` , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(values)
      })
      .then(response => {
        if(!response.ok){
          throw Error(response.statusText)
        } else {
          return response.text()
        }
      }).then((data) => {
          setReviews(JSON.parse(data, (key, value) => {
            const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/
            if (typeof value === "string" && dateFormat.test(value)) {
              return new Date(value)
            }
  
            return value
          }))
          actions.resetForm({values: {comment: ''}})

          toast.success(`Successfully posted`, {onClose: () => {
            document.location = `/movie_lists/${list.id}/movies/${movie.id}`
          }})
      }).catch((error) => {
        toast.error(`Failed to submit review.`)
      });
    }
  })
  return (
    <>
      { authenticated && 
      <Form title="Leave a review"
            yup={validationSchema} 
            formik={{handleSubmit, handleChange, values, errors, setFieldValue}} 
            onCancel={false}
            textareas={{comment: 2}}/> 
      }

      <h3 className="mt-3 pb-4 border-bottom border-2 border-primary">Reviews</h3>
      <div className="with-border-inbetween">
      {
        reviews.length > 0 ? reviews.map((r, ndx) => {
          return (
            <div className="d-flex my-4" key={ndx}>
              <div className="flex-shrink-0">
                {/* <Identicon string={r.postedBy} size={80} className="img-thumbnail rounded mx-auto d-block"/>  */}
                <Avatar name={r.postedBy.displayName} round={true} size={80} className=" mx-auto d-block"/>
              </div>
              <div className="flex-grow-1 ms-5">
                <figure>
                  <blockquote className="blockquote">
                    <p>{r.comment}</p>
                  </blockquote>
                  <figcaption className="blockquote-footer">Posted at {formatRelative(r.postedAt, new Date())}</figcaption>
                </figure>
              </div>
            </div>
          )
        }) : <p className="text-center">Nothing to display</p>
      }
      </div>
    </>
  )
}
