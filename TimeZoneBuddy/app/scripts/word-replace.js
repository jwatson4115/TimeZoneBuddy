replaceTextInHtml(getTimeZoneRegex(), 'found');
var  req = {};
req.body = {
    date: "09/06/2016",
    time: "07:41:00",
    tz: "America/New_York"
};

var a = moment
           .tz(req.body.date + " " + req.body.time, "MM/DD/YYYY HH:mm:ss", req.body.tz)
           .utc()
           .format();

/* Replaces all occurences of a piece of text in an html DOM with another */
function replaceTextInHtml(oldText, newText) {
    var elements = document.getElementsByTagName('*');

    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];

        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];

            if (node.nodeType === 3) {
                var text = node.nodeValue;

                var replacedText = text
                    .replace(oldText, newText);

                if (replacedText !== text) {
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
    }
}

/* Returns a regex that matches many common time zone formats
 * Examples: "4pm EDT", "12am GMT", "12pm GMT + 1" */ 
function getTimeZoneRegex() {
    return /((2[0-4])|(1[0-9])|[1-9])(:([1-6][0-9]|[0][0-9]))?\s*(pm|am)?\s(edt|gmt|utc|est|cest|pst|ist|cst|mst|bst)\s?((\+|\-)\s?((2[0-4])|(1[0-9])|[1-9])?(:([1-6][0-9]|[0][0-9]))?)?/ig;
}

getUTCOffset();

function getUTCOffset(timezone) {
    debugger;
    // Use moment to parse your UTC date
    //var utcDate = moment.utc('2013-02-08 09:30');
    var utcDate = moment.utc(getFormattedDate()+' '+getFormattedTime('2pm'));
    // Get the local version of that date
    var localDate = utcDate.local();

}

/* Get the current date of the users browser to format 
 * and use as a UTC String */
function getFormattedDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    return (dd + '-' + mm + '-' + yyyy);
}

function getFormattedTime(time) {
    var formattedTime = "";

    // check if 24 hour format or not
    if (time.indexOf('am') === -1 && time.indexOf('pm') === -1) {
        formattedTime = getFormattedTime24HourMode(time);
        return formattedTime;
    } else {
        formattedTime = getFormattedTime12HourMode(time);
        return formattedTime;
    }

    
}

function getFormattedTime24HourMode (time) {
    var dd = time.substr(0, 2);
    var mm = time.substr(3, 2);

    return dd + ':' + mm;
}

function getFormattedTime12HourMode(time) {

    var formattedTime = '';

    var regex = /1[0-2](am|pm)/;
    var regex2 = /[1-9](am|pm)/;
    var regex3 = /(1[0-2]):([0-5][0-9])(am|pm)/;
    var regex4 = /([1-9]):([0-5][0-9])(am|pm)/;

    if (regex.test(time)) {
        formattedTime = time.substr(0, 2);
        formattedTime += ':00';

    }
    else if (regex2.test(time)) {
        formattedTime += '0';
        formattedTime += time.substr(0, 1);
        formattedTime += ':00';
    }
    else if (regex3.test(time)) {
        formattedTime = time.substr(0, 2);
        formattedTime += ":" + time.substr(3, 2);
    }
    else if (regex4.test(time)) {
        formattedTime = "0"+time.substr(0, 1);
        formattedTime += ":" + time.substr(2, 2);
    }

    var hour = parseInt(formattedTime.substr(0, 2));

    if (time.indexOf('am') > -1) {
        if (hour === 12) {
            hour = 0;
        }
    }
    else if (time.indexOf('pm') > -1) {

        if (hour !== 12) {
            hour += 12;
        }

    }

    if (hour < 10) {
        hour = '0' + hour;
    }

    formattedTime = hour + formattedTime.substr(2);

    return formattedTime;
}

function getEDTOffset() {
    
}