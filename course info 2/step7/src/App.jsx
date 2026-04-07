import React from 'react'


const Header = ({ name }) => {
  return <h1>{name}</h1>
}

const Part = ({ part }) => {
  return <p>{part.name} {part.exercises} </p>
}


const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return(
    <p><strong>Total exercises: {total}</strong></p>
  )
}
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
      <Total parts={parts} />
    </div>
  )

}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10, id: 1 },
      { name: 'Using props to pass data', exercises: 7, id: 2 },
      { name: 'State of a component', exercises: 14, id: 3 },
      {name: 'Redux', exercises: 11,id: 4 }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App


























