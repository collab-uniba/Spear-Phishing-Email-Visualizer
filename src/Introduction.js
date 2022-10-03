import React from 'react'

const Introduction = (props) => {
  return (
    <div className="Intro">
        <div>Benvenuto/a nel test. Giudica le email qui sotto</div>
        <div>Premi <strong>"Phishing"</strong> se pensi che la mail sia phishing</div>
        <div>Premi <strong>"Legittima"</strong> se pensi che la mail sia legittima</div>
        <div><strong>ATTENZIONE</strong></div> 
        <div>Se clicchi su uno dei link nelle email, vuol dire che ti stai fidando della mail</div>
        <div><b>Alcune email sembreranno duplicati, non ti preoccupare, sono diverse.</b></div>
        <div>Quindi la scelta che devi prendere è <strong>legittima</strong></div>
    </div>
  )
}

export default Introduction