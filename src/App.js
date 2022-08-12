import React, { useEffect, useState } from 'react'
import './App.css';
import BottomArea from './BottomArea';
import Button from './Button';
import Email from './Email';
import FinalMessage from './FinalMessage';
import Introduction from './Introduction';
import Login from './Login/Login';

function App() {

  const [logged, setLogged] = useState(false);

  const [user, setUser] = useState();

  const [selectedEmlIdx, setSelectedEmlIdx] = useState(0);

  const [allEmails, setAllEmails] = useState([])

  const [finished, setFinished] = useState(false);

  const emptyEmails = () => {
    setAllEmails([]);
  }

  const getEmails = (userMail) => {
    emptyEmails();
    fetch(`http://localhost:8080/api/emails/${userMail}`)
      .then((response) => response.json())
      .then((data) => setAllEmails(
        data.map(el => ({
          id: el.id,
          from: el.f_email,
          subj: el.subj,
          fk_target: el.fk_target,
          content: el.content
        }))
      ))
      .catch(() => alert("Nessuna mail trovata nel DB"));
  }

  const initialize = (userData) => {
    setUser(userData);
    getEmails(userData.email);
    setLogged(true);
  }


  const increaseIdx = () => {
    if (selectedEmlIdx >= allEmails.length - 1){
      setFinished(true);
      return
    } 
    
    setSelectedEmlIdx(idx => idx + 1);
  }

  const decreaseIdx = () => {
    if (selectedEmlIdx <= 0) return

    setSelectedEmlIdx(idx => idx - 1);
  }

  const evalLegit = () => {
    fetch(`http://localhost:8080/api/eval`, {
      method: 'POST',
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

  const evalPhish = () => {
    fetch(`http://localhost:8080/api/eval`, {
      method: 'POST',
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

  const leftClick = () => {
    evalLegit();
    increaseIdx();
  }

  const rightClick = () => {
    evalPhish();
    increaseIdx();
  }

  console.log(">>>>>>>>>>>>>")
  console.log({
    hasEmails: !!allEmails.length,
    allEmails,
    selectedEmlIdx,
  })
  console.log("<<<<<<<<<<<<<")

  return (
    <div className="App">
      {!logged && <Login loginFunc={initialize} />}
      {!!allEmails.length && logged && !finished &&
        (<React.Fragment>
          <Introduction />
          <Email email={allEmails[selectedEmlIdx]} />
          <BottomArea leftBtnClick={leftClick} rightBtnClick={rightClick} />
          <Button text="Go Back" onClickFunc={decreaseIdx}/>
          <Button text="Go Ahead" onClickFunc={increaseIdx}/>
        </React.Fragment>)
      }
      {finished && <FinalMessage/>}
    </div>
  );
}

export default App;
