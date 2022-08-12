import React from 'react'

const Button = (props) => {
  return (
    <div>
        <input className="btn btn btn-secondary" type="button" value={props.text} onClick={props.onClickFunc}></input>
    </div>
  )
}

export default Button