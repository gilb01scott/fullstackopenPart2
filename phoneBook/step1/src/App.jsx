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
        {persons.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App











































































// import React from 'react'

// import { useState } from 'react'

// const App = () => {
//   const [persons, setPersons] = useState([
//     { name: 'Arto Hellas' }
//   ]) 
//   const [newName, setNewName] = useState('')

//


//   const addNewName = (event) => {
//     event.preventDefault()
//     console.log(event.preventDefault)
//     const nameObject = { name: newName }
//     setPersons(persons.concat(nameObject))
//     setNewName('')
//   }

// const handleNameChange = (event) =>{
//      setNewName(event.target.value)
//      console.log(event.target.value) 
// }
//   return (
//     <div>
//       <h2>Phonebook</h2>

//       <form onSubmit={addNewName}>
//         <div>
//           Name: <input value={newName} onChange={handleNameChange}/>
//        </div>
//         <div>
//           <button type="submit">Add</button>
//         </div>
//       </form>

//         <h2>Members</h2>

//           {persons.map((p, i) => <li key={i}>{p.name}</li> )}
//     </div>
//   )
// }




// export default App

