import React from 'react'
import { parseEml, readEml, GBKUTF8, decode } from 'eml-parse-js';

const Email = () => {


    const testEmail = () => {
        const eml = document.getElementById("email").files[0];
        console.log(eml);
        readEml(eml, (err, ReadedEmlJson) => {
            console.log(ReadedEmlJson.html);
        });
    }


    const showEmail = () => {

    }

    return (
        <div>
            <div>
                <input type="file" id="email" name="email" onChange={testEmail}></input>
            </div>
        </div>
    )
}

export default Email