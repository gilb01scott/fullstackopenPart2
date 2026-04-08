import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '+1 401 300 812' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addNewName = (event) => {
    event.preventDefault()

    // check duplicate name (case-insensitive)
    const exists = persons.some(
      person => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (exists) {
      alert(`${newName} already exists`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    setPersons([...persons, newPerson])
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addNewName}>
        <div>
          Name:
          <input value={newName} onChange={handleNameChange}/>
        </div>

        <div>
          Number:
          <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <button type="submit">Add</button>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <li key={person.name}>
            {person.name} - {person.number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App