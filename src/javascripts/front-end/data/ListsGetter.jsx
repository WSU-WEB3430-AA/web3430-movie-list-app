import React, { useEffect, useContext } from "react"
import { Outlet } from "react-router-dom"
import { MovieListsContext } from "../App"

export default function ListsGetter(props) {
  const { lists, setLists } = useContext(MovieListsContext)

  useEffect(() => {
    fetch("/api/movie_lists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((response) => response.text())
      .then((data) => {
        setLists(
          JSON.parse(data, (key, value) => {
            const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/
            if (typeof value === "string" && dateFormat.test(value)) {
              return new Date(value)
            }

            return value
          }).map((item) => {
            item.doc.editable = item.editable
            return item.doc
          })
        )
      })
      .catch(console.error)
  }, [])

  if (!lists) return <p>Loading...</p>

  return <Outlet />
}
