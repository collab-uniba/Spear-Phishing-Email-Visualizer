import React from 'react'

const Subject = (props) => {
  return (
    <div>
        <span className="Subject">Oggetto:</span>
        <span className="SubjectContent"> 
            {props.subject}
        </span>
    </div>
  )
}

export default Subject