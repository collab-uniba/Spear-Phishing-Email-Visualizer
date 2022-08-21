import React, { useState } from 'react'


const PositiveQ = (props) => {

    const [prev, setPrev] = useState(0);

    function evaluate() {
        var qr = document.querySelector(`input[name="qst${props.id}"]:checked`).value;
        if(prev==0){
            props.req();
        }
        if (qr) {
            if(qr>prev){
                props.posFunc((qr-prev));
            } else {
                props.negFunc(-(prev-qr))
            }
            setPrev(qr);
        }
    }

    return (
        <div className='Query'>
            <br/><br/>
            <div className='QueryText'>{`${props.id}. ${props.query}`}</div>
            <div className='QueryOptions' onChange={evaluate}>
                <input className='QueryOpt' type="radio" name={`qst${props.id}`} value="1" /> Molto Inaccurato
                <input className='QueryOpt' type="radio" name={`qst${props.id}`} value="2" /> Moderatamente Inaccurato
                <input className='QueryOpt' type="radio" name={`qst${props.id}`} value="3" /> Né Inaccurato Né Accurato
                <input className='QueryOpt' type="radio" name={`qst${props.id}`} value="4" /> Moderatamente Accurato
                <input className='QueryOpt' type="radio" name={`qst${props.id}`} value="5" /> Molto Accurato
            </div>
        </div>
    )
}

export default PositiveQ