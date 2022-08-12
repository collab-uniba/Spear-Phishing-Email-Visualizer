import React, {useEffect, useState} from 'react'
import './App.css';
import BottomArea from './BottomArea';
import Button from './Button';
import Email from './Email';
import Introduction from './Introduction';
import Login from './Login/Login';

function App() {
  
  const[logged, setLogged] = useState(false);

  const[loaded, setLoaded] = useState(false);

  const[user, setUser] = useState();

  const[selectedEmlIdx, setSelectedEmlIdx] = useState(0);

  const [allEmails, setAllEmails] = useState([])
  
  const emptyEmails = () => {
    setAllEmails([]);
    setLoaded(false);
  }

  const getEmails = (userMail) => {
    emptyEmails();
    fetch(`http://localhost:8080/api/emails/${userMail}`)
    .then((response) => response.json())
    .then((data) => processJSONEmails(data))
    .catch(() => alert("Nessuna mail trovata nel DB"));
  }

  const processJSONEmails = (data) => {
    setLoaded(true);
    data.forEach(el => {
      console.log(el);
      setAllEmails(arr => [...arr, {id: el.id, subj: el.subj, fk_target:el.fk_target, content:el.content}]);
    });    
  }

  const initialize = (userData) => {
    setUser(userData);
    setLogged(true);
    getEmails(userData.email);
  }

  const increaseIdx = () =>{
    if(selectedEmlIdx<allEmails.length-1){
      setSelectedEmlIdx(idx => idx+1);
    }
  }

  const decreaseIdx = () =>{
    if(selectedEmlIdx>0){
      setSelectedEmlIdx(idx => idx-1);
    }
  }

  return (
    <div className="App">
      {!logged && !loaded && <Login loginFunc={initialize}/>}
      {logged && <Introduction/>}
      {loaded  && <Email email={allEmails[selectedEmlIdx]}/>}
      {loaded  && <BottomArea leftBtnClick={decreaseIdx} rightBtnClick={increaseIdx}/>}
    </div>
  );
}

export default App;
