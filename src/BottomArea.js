import React from 'react'
import Button from './Button'

const BottomArea = (props) => {
  return (
    <div className='BottomArea'>
        <span className="LeftButton">
            <Button text="Precedente" onClickFunc={props.leftBtnClick}/> 
        </span>
        <span className="RightButton">
            <Button text="Successiva" onClickFunc={props.rightBtnClick}/> 
        </span>
    </div>
  )
}

export default BottomArea