import React from 'react'
import Button from './Button'

const BottomArea = (props) => {
  return (
    <div className='BottomArea'>
        <span className="LeftButton">
            <Button text="Legittima" onClickFunc={props.leftBtnClick}/> 
        </span>
        <span className="RightButton">
            <Button text="Phishing" onClickFunc={props.rightBtnClick}/> 
        </span>
    </div>
  )
}

export default BottomArea