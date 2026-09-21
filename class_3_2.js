const fs = require('fs');
const textRef = 'txt/vanasonad.txt';

//impordin oma kuupäeva mooduli
//const dateET = require('./src/dateET.js');
const dateET = require('./src/dateTimeET.js');


function showText(rawText)
{
    //teeme tekstist listi (järjend, massiiv, array)
    let folkWisdom = rawText.split(';');
    //console.log(folkWisdom);
    console.log('Tänane vanasõna: ' + folkWisdom[Math.round(Math.random() * (folkWisdom.length - 1))]);
    console.log('Keel on ' + dateET.fullTime())
}

function readTextFile(reference)
{
    let result = 'Kahjuks teksti ei leitud';
    fs.readFile(reference, 'utf8', (err, data)=>{
        if(err)
        {
            console.log('Viga: ' + err);
        }
        else
        {
            showText(data);
        }
    });
    //return result;    
}

readTextFile(textRef);

//console.log(dateET.dateFormattedET());
console.log(dateET.fullDate());