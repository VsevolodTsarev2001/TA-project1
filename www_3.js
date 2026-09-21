const http = require('http');
// Moodul päringu parsimiseks
const url = require('url');
// Moodul failitee haldamiseks
const path = require('path');
// Asünkroonne failide haldamine (fs.promises)
const fs = require('fs').promises;
const dateET = require('./src/dateTimeET');
const textRef = 'txt/vanasonad.txt';

const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Vsevolod Tsarev, veebiprogrammerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Vsevolod Tsarev, esimene veebileht</h1>\n\t<p>See veebileht on loodud õppetöö raames ja ei sisalda tõsiseltvõetavat sisu.</p>\n\t<p>Olen Vsevolod Tsarev, esimese kursuse üliõpilane, osalen <a href="https://www.tlu.ee/">Tallinna Ülikooli</a> Digitehnoloogiate instituudi veebiprogrammerimise kursusel.</p>\n\t<section id="pohiteemad" style="position: relative;"><h2>Veebiprogrammerimise põhiteemad</h2><div><ul><li>HTML, CSS</li><li>Javascript</li><li>PHP + MySQL andmebaasiga ühendumine</li></ul></div></section>\n\t<hr>\n';
const pageBanner = '<img src="veebiprogrammeerimine_2026_TA.png" alt="Banner">';
const pageFoot = '\n</body>\n</html>';

http.createServer(async function(req, res){
	// Parsime URL-i
	console.log('Päring: ' + req.url);
	let currentURL = url.parse(req.url, true);
	console.log('Parsituna: ' + currentURL.pathname);
	
	// Avaleht ( / )
	if(currentURL.pathname === '/'){	
		res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		
		const currentDate = dateET.fullDate();
		const currentTime = typeof dateET.fullTime === 'function' ? dateET.fullTime() : '';
		res.write('\n\t<p>Täna on ' + currentDate + ', kell oli lehe avamise hetkel: ' + currentTime + '.</p>');
		
		res.write('\n\t<ul>');
		res.write('\n\t\t<li><a href="/vanasona">Tänane vanasõna</a></li>');
		res.write('\n\t</ul>');
		res.write(pageFoot);
		return res.end();
	}
	
	// Vanasõnade leht ( /vanasona )
	else if(currentURL.pathname === '/vanasona'){
		try {
			const data = await fs.readFile(textRef, 'utf8');
			let folkWisdom = data.split(';');
			let randomIndex = Math.round(Math.random() * (folkWisdom.length - 1));
			let randomProverb = folkWisdom[randomIndex].trim();

			res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
			res.write(pageHead);
			res.write(pageBanner);
			res.write('\t<h1>Eesti vanasõnad</h1>\n\t<p>Siin näed tänase päeva vanasõna:</p>');
			res.write(`\n\t<p><em>"${randomProverb}"</em></p>`);
			res.write('\n\t<p><a href="/">Tagasi avalehele</a></p>');
			res.write(pageFoot);
			return res.end();
		} catch (err) {
			res.writeHead(500, {"Content-type": "text/plain; charset=utf-8"});
			return res.end('Vanasõnade lugemine ebaõnnestus!');
		}
	}
	
	// Pildi kuvamine ( /veebiprogrammeerimine_2026_TA.png )
	else if(currentURL.pathname === '/veebiprogrammeerimine_2026_TA.png'){
		let picPath = path.join(__dirname, 'pic', currentURL.pathname);
		try {
			const data = await fs.readFile(picPath);
			res.writeHead(200, {"Content-type": "image/png"});
			return res.end(data);
		} catch (err){
			res.writeHead(404, {"Content-type": "text/plain; charset=utf-8"});
			return res.end('Pilti ei leitud!');
		}
	}
	
	// 404 vea leht
	else {
		res.writeHead(404, {"Content-type": "text/html; charset=utf-8"});
		return res.end('Viga 404, ei leia sellist lehte!');
	}
}).listen(5125, () => {
    console.log('Server käivitati! Ava brauseris: http://greeny.cs.tlu.ee:5125');
});