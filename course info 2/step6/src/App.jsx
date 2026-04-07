import React from 'react'


// Header shows the course name
const Header = ({ name }) => {
  return <h1>{name}</h1>
}

// Part shows the name and exercises of a single part
const Part = ({ part }) => {
  return <p>{part.name} {part.exercises} </p>
}

// Content renders all the parts
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )

}

// Course wraps Header and Content
const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

// App is the top-level component
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      { name: 'Fundamentals of React', exercises: 10, id: 1 },
      { name: 'Using props to pass data', exercises: 7, id: 2 },
      { name: 'State of a component', exercises: 14, id: 3 },
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App


























