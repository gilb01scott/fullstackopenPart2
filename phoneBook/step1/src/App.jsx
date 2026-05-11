import { useEffect, useState } from "react"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    personService.getAll().then(setPersons)
  }, [])

  const addNewName = (e) => {
    e.preventDefault()

    const existingPerson = persons.find(
      p => p.name.toLowerCase() === newName.toLowerCase()
    )

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

  const deletePerson = (id, name) => {
    const ok = window.confirm(`Delete ${name}?`)
    if (!ok) return

    personService.remove(id).then(() => {
      setPersons(persons.filter(p => p.id !== id))
    })
  }

  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="app">
      <h2>Phonebook</h2>

      <div className="field">
        <label>search:</label>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <h3>Add new</h3>

      <form onSubmit={addNewName}>
        <div className="field">
          <label>name:</label>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>

        <div className="field">
          <label>number:</label>
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-add">add</button>
      </form>

      <h3>Numbers</h3>

      {filteredPersons.map(p => (
        <div key={p.id} className="person">
          <span className="person-info">
            {p.name}
            <span className="person-number">{p.number}</span>
          </span>
          <button
            className="btn-delete"
            onClick={() => deletePerson(p.id, p.name)}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default App