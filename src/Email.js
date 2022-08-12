import React from 'react'
import From from './Email/From'
import To from './Email/To'
import Subject from './Email/Subject'
import Body from './Email/Body'

const Email = (props) => {
  return (
    <div className="Email">
        <From from={props.email.from}/>
        <To to={props.email.to}/>
        <Subject subject={props.email.subject}/>
        <Body html={`${props.email.html}`}/>
    </div>
  )
}

export default Email