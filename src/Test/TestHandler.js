import React, { useState } from 'react'
import Button from '../Button';
import NegativeQ from './NegativeQ';
import PositiveQ from './PositiveQ';


const TestHandler = (props) => {

    const [count, setCount] = useState(0);

    const [agreebleness, setAgreebleness] = useState(0);

    const [extraversion, setExtraversion] = useState(0);

    const [imagination, setImagination] = useState(0);

    const [nevroticism, setNevroticism] = useState(0);

    const [consciousness, setConsciousness] = useState(0);

    function addA(val) {
        setAgreebleness(agreebleness + parseInt(val));
    }

    function remA(val) {
        setAgreebleness(agreebleness - (-parseInt(val)));
    }

    function addE(val) {
        setExtraversion(extraversion + parseInt(val));
    }

    function remE(val) {
        setExtraversion(extraversion - (-parseInt(val)));
    }

    function addI(val) {
        setImagination(imagination + parseInt(val));
    }

    function remI(val) {
        setExtraversion(imagination - (-parseInt(val)));
    }

    function addN(val) {
        setNevroticism(nevroticism + parseInt(val));
    }

    function remN(val) {
        setExtraversion(nevroticism - (-parseInt(val)));
    }

    function addC(val) {
        setConsciousness(consciousness + parseInt(val));
    }

    function remC(val) {
        setExtraversion(consciousness - (-parseInt(val)));
    }

    const sumbitTest = () => {
        if(count!=20){
            alert("Rispondi a tutte le domande!")
            return
        }
        fetch(`https://phishing-server-uniba-pasquale.loca.lt/api/BF`, {
            method: 'POST',
            mode:'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                u_email: props.user,
                extraversion: parseInt(extraversion),
                agreebleness: parseInt(agreebleness),
                imagination: parseInt(imagination),
                nevroticism: parseInt(nevroticism),
                consciousness: parseInt(consciousness)
            })
        }).then((response) => response.json())
            .then((data) => {console.log("Successo: " ,data)})
            .then(()=>props.finish())
            .catch(err => console.log("Errore nel caricamento ", err));
    }

    console.log(">>>>>>>>>>>>>")
    console.log("E: " + extraversion);
    console.log("A: " + agreebleness);
    console.log("I: " + imagination);
    console.log("N: " + nevroticism);
    console.log("C: " + consciousness);
    console.log("Domande a cui ha risposto: " + count);
    console.log(JSON.stringify({
        u_email: props.user,
        extraversion: parseInt(extraversion),
        agreebleness: parseInt(agreebleness),
        imagination: parseInt(imagination),
        nevroticism: parseInt(nevroticism),
        consciousness: parseInt(consciousness)
    }))
    console.log("<<<<<<<<<<<<<")
    return (
        <div className='QueryDiv'>
            <div className='QueryInstruction'>Rispondi con sincerità alle venti (20) domande qui sotto indicando quanto le seguenti frasi ti descrivono.</div>
            <PositiveQ query="Sono l'anima della festa" id={1} posFunc={addE} negFunc={remE} req={() => setCount(count + 1)} />
            <PositiveQ query="Empatizzo con le emozioni degli altri" id={2} posFunc={addA} negFunc={remA} req={() => setCount(count + 1)} />
            <PositiveQ query="Appena ricevo un ordine lo eseguo subito" id={3} posFunc={addC} negFunc={remC} req={() => setCount(count + 1)} />
            <PositiveQ query="Ho frequenti sbalzi di umore." id={4} posFunc={addN} negFunc={remN} req={() => setCount(count + 1)} />
            <PositiveQ query="Ho una vivida immaginazione" id={5} posFunc={addI} negFunc={remI} req={() => setCount(count + 1)} />
            <NegativeQ query="Non parlo molto" id={6} posFunc={addE} negFunc={remE} req={() => setCount(count + 1)} />
            <NegativeQ query="Non sono interessato ai problemi degli altri" id={7} posFunc={addA} negFunc={remA} req={() => setCount(count + 1)} />
            <NegativeQ query="A volte mi dimentico di rimettere le cose al loro posto" id={8} posFunc={addC} negFunc={remC} req={() => setCount(count + 1)} />
            <NegativeQ query="Sono quasi sempre rilassato" id={9} posFunc={addN} negFunc={remN} req={() => setCount(count + 1)} />
            <NegativeQ query="Non sono interessato ai concetti astratti" id={10} posFunc={addI} negFunc={remI} req={() => setCount(count + 1)} />
            <PositiveQ query="Alle feste parlo con molte persone diverse" id={11} posFunc={addE} negFunc={remE} req={() => setCount(count + 1)} />
            <PositiveQ query="Sento le emozioni degli altri" id={12} posFunc={addA} negFunc={remA} req={() => setCount(count + 1)} />
            <PositiveQ query="Mi piace l'ordine" id={13} posFunc={addC} negFunc={remC} req={() => setCount(count + 1)} />
            <PositiveQ query="Mi altero facilmente" id={14} posFunc={addN} negFunc={remN} req={() => setCount(count + 1)} />
            <NegativeQ query="Faccio fatica a capire concetti astratti" id={15} posFunc={addI} negFunc={remI} req={() => setCount(count + 1)} />
            <NegativeQ query="Mi tengo in disparte." id={16} posFunc={addE} negFunc={remE} req={() => setCount(count + 1)} />
            <NegativeQ query="Non sono realmente interessato agli altri" id={17} posFunc={addA} negFunc={remA} req={() => setCount(count + 1)} />
            <NegativeQ query="Combino sempre pasticci" id={18} posFunc={addC} negFunc={remC} req={() => setCount(count + 1)} />
            <NegativeQ query="È raro che mi senta giù di morale" id={19} posFunc={addN} negFunc={remN} req={() => setCount(count + 1)} />
            <NegativeQ query="Non ho una buona imaginazione" id={20} posFunc={addI} negFunc={remI} req={() => setCount(count + 1)} />
            <div className="TestButton">
                <Button text="Invia" onClickFunc={sumbitTest}/>
            </div>
        </div>
    )
}

export default TestHandler