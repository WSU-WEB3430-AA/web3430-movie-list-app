import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { toast } from "react-toastify"
import Form from "./Form"

const validationSchema = yup.object({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email().required("Required"),
  username: yup.string().required("Required"),
  password: yup.string().required(),
})

export default function SignUpForm() {
  const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit(values) {
      fetch("/api/users/signup", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.ok) throw Error("Failed to sign in")
        })
        .then(() => {
          toast.success(`Successfully submitted`, {
            onClose: () => {
              document.location = "/movie_lists"
            },
          })
        })
        .catch((err) => {
          toast.error(err.message)
        })
    },
  })

  return (
    <Form
      title="Sign up for a new account"
      nav={
        <div className="text-end mt-2 text-muted">
          <a href="/signin">Sign in</a> if you already have an account
        </div>
      }
      yup={validationSchema}
      formik={{ handleSubmit, handleChange, values, errors, setFieldValue }}
      onCancel={() => (document.location = "/movie_lists")}
    />
  )
}
