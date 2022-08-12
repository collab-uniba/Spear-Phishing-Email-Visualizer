import React from 'react'

const From = (props) => {
  return (
    <div>
        <span className="From">Da:</span>
        <span className="FromContent"> 
            <a href={`mailto:${props.from}`}>{props.from}</a>
        </span>
    </div>
  )
}

export default From