import React from 'react'
import Contact from './Contact'

const Persons = (props) => {
    // console.log(props.showPersons)
    if (props.showPersons) {
        return (
             <div>
                {props.showPersons.map(person => 
                    <Contact key={person.id} 
                        name={person.name} 
                        number={person.number}
                        handlePersonDelete={props.handlePersonDelete}
                        id={person.id}
                    />
                )}
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}

export default Persons