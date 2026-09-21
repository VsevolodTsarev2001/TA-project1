const fs = require('fs');
const textRef = 'txt/vanasonad.txt';

function showFullText(data)
{
    console.log(data);
}

function showText(rawText)
{
    //teeme tekstist listi (järjend, massiiv, array)
    let folkWisdom = rawText.split(';');
    //console.log(folkWisdom);
    if(Math.round(Math.random()) == 0)
    {
        console.log('Meile on teada järgmised vanasõnad:')
        for(let i = 0; i < folkWisdom.length; i ++)
        {
            console.log((i + 1) + ') ' + folkWisdom[i]);
        }
    }
    else
    {
        console.log('Tänane vanasõna: ' + folkWisdom[Math.round(Math.random() * (folkWisdom.length - 1))]);
    }

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
            //result = data;
            //return(data);
            //showFullText(data);
            showText(data);
        }
    });
    //return result;    
}

readTextFile(textRef);