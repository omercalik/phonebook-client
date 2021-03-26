import React, { useState } from "react"

import Service from "./Service"
import Notification from "./Notification"

const PersonForm = ({ persons, cb }) => {
  const [newName, setNewName] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [alertMessage, setAlertMessage] = useState({
    message: null,
    status: "error",
  })
  return (
    <form>
      <Notification
        message={alertMessage.message}
        status={alertMessage.status}
      />
      <div>
        name:{" "}
        <input
          onChange={(e) => {
            setNewName(e.target.value)
          }}
        />
      </div>
      <div>
        phone:{" "}
        <input
          onChange={(e) => {
            setNewPhone(e.target.value)
          }}
        />
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault()
            console.log(persons)

            const found = persons.some(
              (person) => person.name === newName && person.number === newPhone
            )
            const found2 = persons.some(
              (person) => person.name === newName && person.number !== newPhone
            )

            if (found) {
              console.log(persons)
              setAlertMessage({
                message: `${newName} is already on the  phonebook`,
                status: "error",
              })
              setTimeout(() => {
                setAlertMessage({ ...alertMessage, message: null })
              }, 5000)
            } else if (found2) {
              const toUpdate = persons.find((person) => person.name === newName)
              console.log(toUpdate)
              if (
                window.confirm(
                  `${newName} is already on the book,replace the old number with a new one?`
                )
              ) {
                Service.updateContact(toUpdate.id, {
                  name: newName,
                  number: newPhone,
                })
                  .then((response) => {
                    console.log(response)
                    let updatedPersons = persons.map((person) =>
                      person.id !== toUpdate.id ? person : response
                    )
                    console.log(updatedPersons)
                    cb(updatedPersons)
                    setAlertMessage({
                      message: `${newName} updated successfully`,
                      status: "success",
                    })
                  })
                  .catch((err) => {
                    setAlertMessage({
                      message: `${newName} has already been deleted from server`,
                      status: "error",
                    })
                  })

                setTimeout(() => {
                  setAlertMessage({ ...alertMessage, message: null })
                }, 5000)
              }
            } else {
              const newContact = { name: newName, number: newPhone }

              Service.create(newContact)
                .then((addedContact) => {
                  if (addedContact.status === 400) {
                    setAlertMessage({
                      message: addedContact.data.errors
                        ? addedContact.data.message
                        : addedContact.data.error,
                      status: "error",
                    })
                  } else {
                    setAlertMessage({
                      message: `${newName} successfully added to phonebook.`,
                      status: "success",
                    })
                    cb(persons.concat(addedContact))
                  }
                })
                .catch((err) => {
                  console.log(err)
                  setAlertMessage({
                    message: `day`,
                    status: "error",
                  })
                })
            }
          }}
          type="submit"
        >
          add
        </button>
        <p>debug:{newName}</p>
      </div>
    </form>
  )
}

export default PersonForm
