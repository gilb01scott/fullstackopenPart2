import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' } ])
  const [newName, setNewName] = useState('')

  const addNewName = (event) => {
    event.preventDefault()
    const exists = persons.some(
      person => person.name.toLowerCase() === newName.toLowerCase()
    )
    if (exists) {
      alert(`${newName} already exists to the phoneBook`)
    }
    setPersons([...persons, { name: newName }])
    setNewName('')
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addNewName}>
        <div>
          Name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
      <h2>Members</h2>
      <ul>
        {persons.map(person => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
