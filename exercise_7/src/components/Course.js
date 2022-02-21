import React from 'react'

const Header = ({name}) => (
    <h1>{name}</h1>
)

const Content = ({parts}) => {
    const total = parts.reduce((a, part) => a + part.exercises, 0)

    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part}/>
            )}
            <strong>total of {total} exercises</strong>
        </div>
    )
}

const Part = ({part}) => {
    return <p>{part.name} {part.exercises}</p>
}

const Course = ({courses}) => {
    return (
        <div>
            {courses.map(course => {
                return (
                    <div key={course.id}>
                      <Header name={course.name}/>
                      <Content parts={course.parts}/>  
                    </div>
                )
            })}
        </div>
    )
}

export default Course