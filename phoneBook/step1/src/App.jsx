import { useEffect, useState } from "react"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")

  // LOAD DATA
  useEffect(() => {
    personService.getAll().then(setPersons)
  }, [])

  // ADD OR UPDATE
  const addNewName = (e) => {
    e.preventDefault()

    const existingPerson = persons.find(
      p => p.name.toLowerCase() === newName.toLowerCase()
    )

    // UPDATE FLOW
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} already exists. Replace number with the old one??`
      )

      if (!confirmUpdate) return

      const updatedPerson = {
        ...existingPerson,
        number: newNumber
      }

      personService.update(existingPerson.id, updatedPerson)
        .then(returned => {
          setPersons(
            persons.map(p =>
              p.id !== existingPerson.id ? p : returned
            )
          )
          setNewName("")
          setNewNumber("")
        })

      return
    }

  
    const newPerson = { name: newName, number: newNumber }

    personService.create(newPerson)
      .then(returned => {
        setPersons(persons.concat(returned))
        setNewName("")
        setNewNumber("")
      })
  }

  // DELETE
  const deletePerson = (id, name) => {
    const ok = window.confirm(`Delete ${name}?`)
    if (!ok) return

    personService.remove(id).then(() => {
      setPersons(persons.filter(p => p.id !== id))
    })
  }

  // FILTER
  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        search:
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <h3>Add new</h3>

      <form onSubmit={addNewName}>
        <div>
          name:
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>

        <div>
          number:
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>

      <h3>Numbers</h3>

      {filteredPersons.map(p => (
        <p key={p.id}>
          {p.name} {p.number}
          <button onClick={() => deletePerson(p.id, p.name)}>
            delete
          </button>
        </p>
      ))}
    </div>
  )
}

export default App