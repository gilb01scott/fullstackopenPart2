import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '+1 401 300 812' },
    { name: 'shyaka ceddy', number: '+254 71 300 3232' },
    { name: 'Gilbert Irumva', number: '+ 254  5700 3887' },
    { name: 'Melvin Ezekiel', number: '+1 4231 300 812' },
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const addNewName = (event) => {
    event.preventDefault()

    const exists = persons.some(
      person => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (exists) {
      alert(`${newName} already exists`)
      return
    }

    setPersons([...persons, { name: newName, number: newNumber }])
    setNewName('')
    setNewNumber('')
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        search:
        <input
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder='search names here ..'
        />
      </div>

      <h2>Add a new</h2>
      <form onSubmit={addNewName}>
        <div>
          Name:
          <input value={newName} onChange={() => setNewName(e.target.value)} />
        </div>

        <div>
          Number:
          <input value={newNumber} onChange={() => setNewNumber(e.target.value)} />
        </div>

        <button type="submit">Add</button>
      </form>

      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => (
          <li key={person.name}>
            {person.name} - {person.number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App