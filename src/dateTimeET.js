const dateFormattedET = function()
{
    let timeNow = new Date();
    const monthNamesET = ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"];
    return timeNow.getDate() + '. ' + monthNamesET[timeNow.getMonth()] + ' ' + timeNow.getFullYear();
}


const addLeadZero = function(numValue) {
    let strValue = String(numValue);
    if (numValue < 10) {
        strValue = strValue.padStart(2, '0');
    }
    return strValue;
};

const timeFormattedET = function()
{
    let timeNow = new Date();
    let hourNow = timeNow.getHours();
    let minuteNow = timeNow.getMinutes();
    let secondNow = timeNow.getSeconds();

    let timeForematted = hourNow + ':' + addLeadZero(minuteNow) + ':' + addLeadZero(secondNow);
    return timeForematted;
}

//ekspordin kõik vajaliku
module.exports = {fullDate: dateFormattedET, fullTime: timeFormattedET}