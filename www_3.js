const http = require('http');
const fs = require('fs');
const dateET = require('./src/dateTimeET.js');
const textRef = 'txt/vanasonad.txt';

const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Vsevolod Tsarev, veebiprogrammerimine</title>\n</head>\n<body>\n';

const pageBody = '\t<h1>Vsevolod Tsarev, esimene veebileht</h1>\n\t<p>See veebileht on loodud oppetoo raames ja ei sisalda tosiseltvoetavat sisu.</p>\n\t<p>Olen Vsevolod Tsarev, esimese kursuse uliopilane, osalen <a href="https://www.tlu.ee/">Tallinna Ulikooli</a> Digitehnoloogiate instituudi veebiprogrammerimise kursusel.</p>\n\t<section id="pohiteemad" style="position: relative;"><h2>Veebiprogrammerimise pohiteemad</h2><div><ul><li>HTML, CSS</li><li>Javascript</li><li>PHP + MySQL andmebaasiga uhendumine</li></ul></div></section>\n\t<hr>\n';

const pageFoot = '\n</body>\n</html>';

http.createServer(function (req, res) {
    // Loeme failist vanasõnad
    fs.readFile(textRef, 'utf8', (err, data) => {
        let randomProverb = "Vanasonasid ei leitud.";
        
        if (!err) {
            let folkWisdom = data.split(';');
            let randomIndex = Math.round(Math.random() * (folkWisdom.length - 1));
            randomProverb = folkWisdom[randomIndex].trim();
        }

        // Võtame kuupäeva ja kellaaja oma moodulist
        const currentDate = dateET.fullDate();
        const currentTime = typeof dateET.fullTime === 'function' ? dateET.fullTime() : '';
        
        // Dünaamiline sisu (kuupäev, kell ja vanasõna)
        const dynamicContent = `
            <div style="margin-top: 20px; font-family: sans-serif;">
                <p><strong>Tana on:</strong> ${currentDate}</p>
                <p><strong>Kell on:</strong> ${currentTime}</p>
                <p><strong>Paeva vanasõna:</strong> <em>"${randomProverb}"</em></p>
            </div>
        `;

        // Määrame vastuse päisesse Content-type ja UTF-8 kodeeringu
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.write(pageHead);
        res.write(pageBody);
        res.write(dynamicContent);
        res.write(pageFoot);
        return res.end();
    });

}).listen(5125, () => {
    console.log('Server kaivitati! Ava brauseris: http://greeny.cs.tlu.ee:5125');
});