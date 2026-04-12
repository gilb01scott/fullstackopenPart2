

import { useEffect, useState } from "react"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")

  // FETCH DATA FROM BACKEND
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  // ADD PERSON TO BACKEND (THIS IS WHAT YOU WERE MISSING)
  const addNewName = (event) => {
    event.preventDefault()

    const exists = persons.some(
      p => p.name.toLowerCase() === newName.toLowerCase()
    )

    if (exists) {
      alert(`${newName} already exists`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    axios
      .post("http://localhost:3001/persons", newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName("")
        setNewNumber("")
      })
  }

  // HANDLERS
  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleSearchChange = (e) => setSearch(e.target.value)

  // FILTER
  const filteredPersons = persons.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <input
        placeholder="search"
        value={search}
        onChange={handleSearchChange}
      />

      <h3>Add new</h3>

      <form onSubmit={addNewName}>
        <div>
          name:
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <button type="submit">add</button>
      </form>

      <h3>Numbers</h3>

      {filteredPersons.map(p => (
        <p key={p.id}>
          {p.name} {p.number}
        </p>
      ))}
    </div>
  )
}

export default App






























// import { useState } from 'react'
// import Filter from './components/Filter'
// import PersonForm from './components/PersonForm'
// import Persons from './components/Persons'
// const App = () => {
//   const [persons, setPersons] = useState([
//     { id: 1, name: 'Arto Hellas', number: '+1 401 300 812' },
//     { id: 2, name: 'shyaka ceddy', number: '+254 71 300 3232' },
//     { id: 3, name: 'Gilbert Irumva', number: '+254 5700 3887' },
//     { id: 4, name: 'Melvin Ezekiel', number: '+1 4231 300 812' },
//   ])
//   const [newName, setNewName] = useState('')
//   const [newNumber, setNewNumber] = useState('')
//   const [search, setSearch] = useState('')

//   const addNewName = (event) => {
//     event.preventDefault()
//     const exists = persons.some(
//       person => person.name.toLowerCase() === newName.toLowerCase()
//     )
//     if (exists) {
//       alert(`${newName} already exists `)
//       return
//     }

//     const newPerson = {
//       id: persons.length + 1,
//       name: newName,
//       number: newNumber
//     }

//     setPersons([...persons, newPerson])
//     setNewName('')
//     setNewNumber('')
//   }

//   const handleNameChange = (event) => {
//     setNewName(event.target.value)
//   }

//   const handleNumberChange = (event) => {
//     setNewNumber(event.target.value)
//   }

//   const handleSearchChange = (event) => {
//     setSearch(event.target.value)
//   }

//   const filteredPersons = persons.filter(person =>
//     person.name.toLowerCase().includes(search.toLowerCase())
//   )

//   return (
//     <div>
//       <h2>Phonebook</h2>

//       <Filter search={search} onSearchChange={handleSearchChange} />

//       <h2>Add a new</h2>

//       <PersonForm
//         onSubmit={addNewName}
//         newName={newName}
//         newNumber={newNumber}
//         onNameChange={handleNameChange}
//         onNumberChange={handleNumberChange}
//       />

//       <h3>Numbers</h3>

//       <Persons persons={filteredPersons} />
//     </div>
//   )
// }
// export default App