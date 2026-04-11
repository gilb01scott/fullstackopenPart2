

import { useEffect, useState } from "react"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      {persons.map(p => (
        <p key={p.id}>{p.name} {p.number}</p>
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