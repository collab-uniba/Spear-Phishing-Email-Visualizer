import React from 'react'

const Body = (props) => {

  function createMarkup() {
        return {__html: props.html};
    }
      

  return (
    <div className="Body">
        <div dangerouslySetInnerHTML={createMarkup()}>   
        </div>
    </div>
  )
}

export default Body