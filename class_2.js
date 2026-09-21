const firstName = 'Vsevolod';
const lastName = 'Tsarev';

let firstValue = 7;
let secondValue = 3;

function authorsName() 
{
    // See pole tegelikult funktsioon vaid protseduur, sest ta ei tagasta mingit väärtust
    console.log('Programmeeris ' + firstName + ' ' + lastName);        
}

function randomValue()
{
    return Math.round(Math.random() * 10);
}

function totalValue(x, y)
{
    return x + y;
}
/*
function totalValue()
{
    return firstValue + secondValue;
}
*/

function myMath()
{
    firstValue = randomValue();
    secondValue = randomValue();
    let myValue = totalValue(firstValue, secondValue);
    return myValue;
}

function timeFormattedET()
{
    let timeNow = new Date();
    let hourNow = timeNow.getHours();
    let minuteNow = timeNow.getMinutes();
    let secondNow = timeNow.getSeconds();

    if (hourNow < 10) {
        hourNow = '0' + hourNow;
    }
    if (minuteNow < 10) {
        minuteNow = '0' + minuteNow;
    }
    if (secondNow < 10) {
        secondNow = '0' + secondNow;
    }

    let timeForematted = hourNow + ':' + minuteNow + ':' + secondNow;
    return timeForematted;
}

function dateFormattedET()
{
    let timeNow = new Date();
    let dateNow = timeNow.getDate();
    let monthNow = timeNow.getMonth();
    //let yearNow = timeNow.getYear();
    let yearNow = timeNow.getFullYear();
    const monthNamesET = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];
    //return dateNow + '.' + (monthNow + 1) + '.' + yearNow;
    return dateNow + '. ' + monthNamesET[monthNow] + ' ' + yearNow;
}

function dayPart()
{
    let partOfDay = 'suvaline hetk';
    let timeNow = new Date();
    let hourNow = timeNow.getHours();
    let weekDayNow = timeNow.getDay(); // 0 on pühapäev, 1-5 esmaspäev-reede, 6 laupäev

    // Üks IF lause kontrollib, kas on argipäev (esmaspäev kuni reede)
    if (weekDayNow >= 1 && weekDayNow <= 5)
    {
        if (hourNow < 6)
        {
            partOfDay = 'Uneaeg';   
        }
        else if (hourNow >= 6 && hourNow < 10)
        {
            partOfDay = 'Hommikuste protseduuride aeg';
        }
        else if (hourNow >= 10 && hourNow < 18)
        {
            partOfDay = 'Kooliaeg';
        }
        else 
        {
            partOfDay = 'Õhtune vaba aeg';
        }
    }
    // Teise IF lausega kontrolliks, kas on nädalavahetus
    else
    {
        if (hourNow < 9)
        {
            partOfDay = 'Nädalavahetuse unerežiim';
        }
        else if (hourNow >= 9 && hourNow < 14)
        {
            partOfDay = 'Nädalavahetuse hommik ja lõuna';
        }
        else
        {
            partOfDay = 'Nädalavahetuse õhtune aeg';
        }
    }

    return partOfDay;
}

function weekDayET()
{
    let weekDay = new Date().getDay();
    const weekDayNamesET = ['puhapäev', 'esmaspäev', 'teisipäev', 'kolmapäev', 'neljapäev', 'reede', 'laupäev']
    return weekDayNamesET[weekDay];
}

authorsName();

console.log(myMath());

console.log('Täna on ' + dateFormattedET());

console.log('Kell on ' + timeFormattedET());

console.log('Praegu on ' + dayPart() + '.')

console.log('Täna on ' + weekDayET());


//console.log(totalValue());

//console.log(randomValue());