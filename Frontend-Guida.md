## Guida all'uso - Spear_phishing_email_visualizer
Applicazione `Spear_phishing_email_visualizer` è una React APP che comunica con il [backend](https://github.com/collab-uniba/Spear-Phishing-Backend).

### Per farla funzionare

#### Se sei in locale
Sostituire i link in Login.js e App.js con https://localhost. 

In Login.js vi è un paragrafo con id `OnlineTestLocalServer`, puoi commentarlo.

#### Se  vuoi aprire un server dal tuo dispositivo

Se si vuole aprire all'esterno momentaneamente il servizio bisogna installare un plugin di Node.js chiamato LocalTunnel che si trova [qui](http://localtunnel.github.io/www/) scegliere un nome per il dominio frontend e uno per il backend ed eseguire su linea di comando:

    lt --port 3000 --subdomain NOMEDOMINIO
 e per il back end
 
    lt --port 8080 NOMEDOMINIOPERBACKEND

Queste operazioni genereranno due link. Il primo servirà per connettersi all'app e il secondo serve all'app per connettersi propriamente al backend.

Cambia i link in App.js e Login.js con i link del backend.

**IMPORTANTE:** Per il funzionamento di LocalTunnel bisogna dare i permessi prima di potersi connettere, per fare ciò è importante che il paragrafo con ID `OnlineTestLocalServer` nel file Login.js sia presente!

**Nella tesi** sono stati usati i seguenti link:
 - NOMEDOMINIO= phishingtest 
	 - Link =[https://phishingtest.loca.lt](https://phishingtest.loca.lt)
 - NOMEDOMINIOPERBACKEND = phishing-server-uniba-pasquale     
	 - Link = https://phishing-server-uniba-pasquale.loca.lt

#### Se si usa un server (NO LOCALTUNNEL)
Commentare il paragrafo con ID `OnlineTestLocalServer` nel file Login.js.

Sostituire i link in Login.js e App.js con i link d'accesso al backend.

### Struttura
L'app è una one page application che prevede un flusso ben chiaro di esecuzione:
- L'utente inserisce la mail nella pagina di login. Se la mail è presente nel Database, allora l'applicazione scarica tutte le email presenti nel DB per l'utente che esegue il login.
- Le mail sono mischiate in ordine e vengono mostrate una alla volta all'utente che dovrà giudicare se sono phishing o legittime. In questa parte il corpo HTML delle mail è preso dal backend e iniettato dentro il div.
- Alla fine vi è un breve test di personalità. Non vengono registrate le risposte, ma solo i punteggi che alla fine vengono inviate al DB.
