import React, { useEffect, useState } from 'react'
import './App.css';
import BottomArea from './BottomArea';
import Button from './Button';
import Email from './Email';
import Introduction from './Introduction';
import Login from './Login/Login';

function App() {

  const [logged, setLogged] = useState(false);

  const [user, setUser] = useState();

  const [selectedEmlIdx, setSelectedEmlIdx] = useState(0);

  const [allEmails, setAllEmails] = useState([])

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

  const processJSONEmails = (data) => {

    setAllEmails(
      data.map(el => ({
        id: el.id,
        f_email: el.f_email,
        subj: el.subj,
        fk_target: el.fk_target,
        content: el.content
      }))
    );
    /*
  var arr = [];
  data.forEach(el => {
    console.log(el);
    arr = [...arr, {id: el.id, subj: el.subj, fk_target:el.fk_target, content:el.content}];
  });  
  console.log(arr)
  setAllEmails(arr);  */
  }

  const initialize = (userData) => {
    setUser(userData);
    getEmails(userData.email);
    setLogged(true);
  }


  const increaseIdx = () => {
    if (selectedEmlIdx >= allEmails.length - 1) return
    
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
        FK_email:user.email,
        FK_id: allEmails[selectedEmlIdx].id,
        isEvalPhish: false
      })
    }).then((response) => response.json())
    .then((data)=> {console.log("Success: ", data)})
    .catch(alert("Errore nel caricamento"));
  }

  const evalPhish = () => {
    fetch(`http://localhost:8080/api/eval`, {
      method: 'POST',
      headers:{ 'Content-Type': 'application/json'},
      body: JSON.stringify({
        FK_email:user.email,
        FK_id: allEmails[selectedEmlIdx].id,
        isEvalPhish: true
      })
    }).then((response) => response.json())
    .then((data)=> {console.log("Success: ", data)})
    .catch(alert("Errore nel caricamento"));
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
      {!!allEmails.length && logged &&
        (<React.Fragment>
          <Introduction />
          <Email email={allEmails[selectedEmlIdx]} />
          <BottomArea leftBtnClick={decreaseIdx} rightBtnClick={increaseIdx} />
        </React.Fragment>)
      }
    </div>
  );
}

export default App;
