import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { toast } from "react-toastify"
import Form from "./Form"
import { useCookies } from "react-cookie"

const validationSchema = yup.object({
  username: yup.string().required("Required"),
  password: yup.string().required(),
})

export default function SignInForm() {
  const [cookies, setCookie] = useCookies(["authenticated"])
  const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit(values) {
      fetch("/api/users/signin", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.ok) {
            switch (response.status) {
              case 401:
                throw Error("Invalid credentials")
              case 404:
                throw Error("User not found")
              case 500:
                throw Error("Server error")
              default:
                throw Error("Unspecified error")
            }
          }
          setCookie("authenticated", "true", { path: "/" })
          toast.success("Successfully signed in.", {
            autoClose: 3000,
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
      title="Sign in to your account"
      nav={
        <div className="text-end mt-2 text-muted">
          <a href="/signup">Sign up</a> if you do not have an account
        </div>
      }
      yup={validationSchema}
      formik={{ handleSubmit, handleChange, values, errors, setFieldValue }}
      onCancel={() => (document.location = "/movie_lists")}
    />
  )
}
