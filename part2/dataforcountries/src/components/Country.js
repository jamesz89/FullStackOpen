import React, { useState } from 'react'

const Country = (props) => {
    console.log('Country props...', props)
    const [show, setShow] = useState(false)

    if (show)
        return (
            <div key={props.value.alpha2Code}>
                <h1>{props.value.name} <button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show' }</button></h1>
                <p>Capital: {props.value.capital}</p>
                <p>Population: {props.value.population.toLocaleString('de-DE')}</p>
                <h2>Languages</h2>
                <ul>
                    {props.value.languages.map(item => {
                        return <li key={item.name}>{item.name}</li>
                    })}
                </ul>
                <img src={props.value.flag} width='200' />
            </div>
        )
    if (!show)
        return <li key={props.value.alpha2Code}>{props.value.name} <button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show' }</button></li>
}

export default Country