import React from 'react'

const To = (props) => {
  return (
    <div>
        <span className="To">A:</span>
        <span className="ToContent"> 
            <a href={`mailto:${props.to}`}>{props.to}</a>
        </span>
    </div>
  )
}

export default To