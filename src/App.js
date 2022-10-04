import React, { useEffect, useState } from 'react'
import './App.css';
import BottomArea from './BottomArea';
import Button from './Button';
import Email from './Email';
import FinalMessage from './FinalMessage';
import Introduction from './Introduction';
import Login from './Login/Login';
import TestHandler from './Test/TestHandler';

function App() {

  const [logged, setLogged] = useState(false);

  const [user, setUser] = useState();

  const [selectedEmlIdx, setSelectedEmlIdx] = useState(0);

  const [allEmails, setAllEmails] = useState([])

  const [finished, setFinished] = useState(false);

  const [end, setEnd] = useState(false);

  const emptyEmails = () => {
    setAllEmails([]);
  }

  // SCARICA TUTTE LE EMAIL DATO UN INDIRIZZO
  const getEmails = (userMail) => {
    emptyEmails();
    fetch(`https://phishing-server-uniba-pasquale.loca.lt/api/emails/${userMail}`, 
    {
      method:'GET',
    mode:'cors'})
      .then((response) => response.json())
      .then((data) => setAllEmails(shuffle(
        data.map(el => ({
          id: el.id,
          from: el.f_email,
          subj: el.subj,
          fk_target: el.fk_target,
          content: el.content
        })))
      ))
      .catch(() => alert("Nessuna mail trovata nel DB"));
  }

  // MISCHIA LE EMAIL
  const shuffle = (arr) => {
    var array = arr;
    
    for(let i = array.length -1; i>0; i--){
      const j = Math.floor(Math.random() * (i+1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    console.log(array);

    return array;
  }

  // INIZIALIZZA IL TEST
  const initialize = (userData) => {
    setUser(userData);
    getEmails(userData.email);
    setAllEmails(shuffle(allEmails));
    setLogged(true);
  }

  // AUMENTA L'INDICE DEL VETTORE EMAIL
  const increaseIdx = () => {
    if (selectedEmlIdx >= allEmails.length - 1){
      setFinished(true);
      return
    } 
    setSelectedEmlIdx(idx => idx + 1);
  }
 
  // DIMINUISCE L'INDICE, SOLO DI DEBUG
  const decreaseIdx = () => {
    if (selectedEmlIdx <= 0) return
    setSelectedEmlIdx(idx => idx - 1);
  }

  // SEGNA LA MAIL COME GIUDICATA LEGITTIMA
  const evalLegit = () => {
    fetch(`https://phishing-server-uniba-pasquale.loca.lt/api/eval`, {
      method: 'POST',
      mode:'cors',
      headers:{ 'Content-Type': 'application/json'},
      body: JSON.stringify({
        fk_email:user.email,
        fk_id: allEmails[selectedEmlIdx].id,
        evalPhish: false
      })
    }).then((response) => response.json())
    .then((data)=> {console.log("Success: ", data)})
    .catch(err => console.log("Errore nel caricamento: ", err));
  }
  
  // SEGNA LA MAIL COME GIUDICATA PHISHING
  const evalPhish = () => {
    fetch(`https://phishing-server-uniba-pasquale.loca.lt/api/eval`, {
      method: 'POST',
      mode:'cors',
      headers:{ 'Content-Type': 'application/json'},
      body: JSON.stringify({
        fk_email:user.email,
        fk_id: allEmails[selectedEmlIdx].id,
        evalPhish: true
      })
    }).then((response) => response.json())
    .then((data)=> {console.log("Success: ", data)})
    .catch(err => console.log("Errore nel caricamento: ", err));
  }

  // FUNZIONE TASTO SINISTRO
  const leftClick = () => {
    evalLegit();
    increaseIdx();
  }

  // FUNZIONE TASTO DESTRO
  const rightClick = () => {
    evalPhish();
    increaseIdx();
  }
  
  console.log(">>>>>>>>>>>>>")
  console.log({
    hasEmails: !!allEmails.length,
    allEmails,
    selectedEmlIdx,
    end
  })
  console.log("<<<<<<<<<<<<<")

  // TASTI DI DEBUG, AGGIUNGERE SOTTO BOTTOMAREA
  //<Button text="Go Back" onClickFunc={decreaseIdx}/>
  //<Button text="Go Ahead" onClickFunc={increaseIdx}/> 

  return (
    <div className="App">
      {!logged && <Login loginFunc={initialize} />}
      {!!allEmails.length && logged && !finished && !end &&
        (<React.Fragment>
          <Introduction />
          <Email email={allEmails[selectedEmlIdx]} uEM={user.email} />
          <BottomArea leftBtnClick={leftClick} rightBtnClick={rightClick} /> 
        </React.Fragment>)
      }
      {finished && !end &&
      (<React.Fragment>
        <TestHandler user={user.email} finish={() => setEnd(true)}/>
      </React.Fragment>)}
        { end && 
          <FinalMessage/>
        }
    </div>
  );
}

export default App;
