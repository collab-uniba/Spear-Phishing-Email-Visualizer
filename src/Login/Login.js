import React, { useState } from 'react'
import Button from '../Button'
import TestHandler from '../Test/TestHandler';
import PositiveQ from './../Test/PositiveQ';



const Login = (props) => {

    const [userEmail, setUserEmail] = useState("")

    // REGEX PER VALIDARE LE EMAIL
    var validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const validateRegexEmail = (email) => {
        return validEmail.test(email);
    }

    const processUser = (email) => {
        // PRENDE LE INFORMAZIONI UTENTI DAL DB
        fetch(`https://phishing-server-uniba-pasquale.loca.lt/api/users/${email}`, {mode:'cors'})
            .then((response) => response.json())
            .then((data) => props.loginFunc(data))
            .catch(() => alert("Problema nel login: email non trovata o server irragiungibile"));
    }

        // Funzione che fa partire il test
    const startTest = () => {
        if (validateRegexEmail(userEmail)) {
            processUser(userEmail);
        } else {
            alert("Questa non può essere una mail!")
        }
    }

    return (

        <div className="LoginForm">
            <div>
                <p>Ciao! Benvenuto nel test di phishing!</p>
                <p>Se sei qui vuol dire che hai già compilato il modulo google</p>
                <p>Prima di iniziare il test, leggi bene i punti qui sotto. Se qualcosa non ti è chiaro, contatta Pasquale Monniello a: 3890238622 </p>
                <p id="OnlineTestLocalServer"><b>Un ultimo passo prima di iniziare, se stai facendo il test online</b>, apri <a target="_blank" href="https://phishing-server-uniba-pasquale.loca.lt">questo link</a> e clicca sul tasto blu <b>Click to Continue</b>. Non ti preoccupare dell'errore. Così facendo stai dicendo al tuo browser che va bene connettersi direttamente al server privato. Chiudi la pagina e torna qui.</p>
                <ul>
                    <li>Il seguente test va fatto una sola volta e tutto in una seduta. Se chiuderai la pagina dovrai ricominciare da capo. Il test prenderà circa 10 minuti del tuo tempo</li>
                    <li>Svolgi questo test preferibilmente da un PC</li>
                    <li>
                        Ti verranno presentate una serie di email. Dovrai giudicare se sono <b>phishing</b> o legittime. Le email di phishing sono email "truffaldine" che contengono contenuto falso e malizioso.
                    </li>
                    <li>
                        Ogni email rappresenta uno scenario. Cioè, se ti viene mostrata una email di Netflix, lo scenario è che sei iscritto a Netflix. Se non lo sei, non ti allarmare. Esempio simile è quando ci sono email di google ma la tua usi libero. Considera lo scenario in cui la mail sia di Google!<b>Lo scopo del test è valutare la tua capacità di giudizio delle email.</b>
                    </li>
                    <li>
                        Non ci sono limiti di tempo ed è concesso l'utilizzo di internet come strumento per aiutare nelle decisioni.
                    </li>
                    <li>
                        Saranno considerati come errori sia email di phishing giudicate come legittime, sia domande legittime giudicate come phishing.
                    </li>
                    <li>
                        Quando avrai giudicato tutte le email, dovrai fare un test della personalità breve di venti domande. Rispondi con sincerità, io non vedrò le risposte.
                    </li>
                    <li>
                        Puoi vedere i link, ma evita di aprirli. Se clicchi su un link dovrai giudicare la mail come legittima perché indica che ti sei fidato della mail.
                    </li>
                </ul>
                <p>Se è tutto chiaro, inserisci la tua mail che hai inserito nel modulo google qui sotto e inizia il test.</p>
            </div>
            <div className="LoginText">
                Inserisci la tua mail
                <input className="EmailForm" type="email" id="PH_email" onChange={t => setUserEmail(t.target.value)} />
                <div className='SubmitBtn'>
                    <Button text="Inizia il Test" onClickFunc={startTest} />
                </div>
            </div>
        </div>
    )
}

export default Login