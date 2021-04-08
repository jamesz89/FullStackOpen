import React from 'react'

const PersonForm = (props) => {
    return (
      <form onSubmit={props.onSubmit}>
        <div>
          Name:<input
            value={props.value.name}
            onChange={props.onChange}
            name="name" 
            />
        </div>
        <div>
          Number:<input
            value={props.value.number}
            onChange={props.onChange} 
            name="number"
            />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )
  }

export default PersonForm