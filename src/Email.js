import React from 'react'
import From from './Email/From'
import To from './Email/To'
import Subject from './Email/Subject'
import Body from './Email/Body'

const Email = (props) => {
  return (
    <div className="Email">
        <From from={props.email.from}/>
        <To to={props.uEM}/>
        <Subject subject={props.email.subj}/>
        <Body html={`${props.email.content}`}/>
    </div>
  )
}

export default Email