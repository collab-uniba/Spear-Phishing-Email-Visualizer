import React from 'react'

const Introduction = (props) => {
  return (
    <div className="Intro">
        <div>Benvenuto/a nel test. Giudica le email qui sotto</div>
        <div><strong>ATTENZIONE</strong> se clicchi su uno dei link nelle email, vuol dire che</div>
        <div>ti stai fidando della mail. Quindi la scelta che devi prendere è <strong>legittima</strong></div>
        <div>Premi <strong>"Phishing"</strong> se pensi che la mail sia phishing</div>
        <div>Premi <strong>"Legittima"</strong> se pensi che la mail sia legittima</div>
    </div>
  )
}

export default Introduction