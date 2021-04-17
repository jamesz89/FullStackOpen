import React from 'react'

const Person = (props) => {
    return (
        <p>
            {props.person.name} | {props.person.number} <button onClick={() => props.handleClick(props.person)}>Delete</button>
        </p>
    )
}

export default Person