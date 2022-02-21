import React from 'react'

const Contact = ({name, number, handlePersonDelete, id}) => {
    return (
        <div>
           <span>{name} {number}</span>
           <button id={id} onClick={handlePersonDelete}>delete</button> 
        </div>
        
    )
}

export default Contact