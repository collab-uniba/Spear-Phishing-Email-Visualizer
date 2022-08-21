import React, { useState } from 'react'
import Button from '../Button'
import TestHandler from '../Test/TestHandler';
import PositiveQ from './../Test/PositiveQ';



const Login = (props) => {

    const [userEmail, setUserEmail] = useState("")

    var validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const validateRegexEmail = (email) => {
        return validEmail.test(email);
    }

    const processUser = (email) => {
        // Fetch user
        fetch(`http://localhost:8080/api/users/${email}`)
            .then((response) => response.json())
            .then((data) => props.loginFunc(data))
            .catch(() => alert("Email non trovata nel DB"));
    }

    const startTest = () => {
        if (validateRegexEmail(userEmail)) {
            processUser(userEmail);
        } else {
            alert("Questa non può essere una mail!")
        }
    }

    return (

        <div className="LoginForm">
            <div className="LoginText">
                Inserisci la tua mail
            </div>
            <input className="EmailForm" type="email" id="PH_email" onChange={t => setUserEmail(t.target.value)} />
            <div className='SubmitBtn'>
                <Button text="Inizia il Test" onClickFunc={startTest} />
            </div>
        </div>
    )
}

export default Login