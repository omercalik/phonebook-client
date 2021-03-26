import { useEffect, useState } from "react"
import axios from "axios"

import Service from "./Service"
import "./App.css"
import PersonForm from "./PersonForm"

function App() {
  const [persons, setPersons] = useState()

  const handleDelete = (id) => {
    axios
      .delete(`https://fierce-badlands-58853.herokuapp.com/api/persons/${id}`)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    Service.getAll()
      .then((res) => {
        console.log(res)
        setPersons(res)
      })
      .catch((err) => console.log(err.response))
  }, [])

  const callBack = (val) => {
    setPersons(val)
  }

  return (
    <div>
      {!persons && <p>Loading</p>}
      {persons &&
        persons.map((person) => (
          <div style={{ display: "flex" }} key={person.id}>
            <p>
              {person.name} {person.number}
            </p>
            <button
              onClick={() => handleDelete(person.id)}
              style={{ height: "30px" }}
            >
              Delete
            </button>
          </div>
        ))}

      <PersonForm persons={persons} cb={callBack} />
    </div>
  )
}

export default App
