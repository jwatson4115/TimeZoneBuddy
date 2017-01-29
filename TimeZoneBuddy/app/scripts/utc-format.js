/* Builds a date string from a given input (such as "2pm")
 * And removes the offset to get the time in UTC.
 * This can then be converted back to the users local time */
function getUTCDate(time, offset) {
    var date = new Date(getFormattedDate() + " " + getFormattedTime(time) + "z");

    date.setTime(date.getTime() + offset * 60 * 60 * 1000);

    return date;
}

/* Get the current date of the users browser to format 
 * and use as a UTC String */
function getFormattedDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }

    return (yyyy+ "-" + mm + "-" + dd);
}

/* Convert the given time string (such as 12:00pm) to
 * A UTC format time string */
function getFormattedTime(time) {
    var formattedTime;

    // check if 24 hour format or not
    if (time.indexOf("am") === -1 && time.indexOf("pm") === -1) {
        formattedTime = getFormattedTime24HourMode(time);
        return formattedTime;
    } else {
        formattedTime = getFormattedTime12HourMode(time);
        return formattedTime;
    }
}

function getFormattedTime24HourMode(time) {
    var dd = time.substr(0, 2);
    var mm = time.substr(3, 2);

    return dd + ":" + mm;
}

function getFormattedTime12HourMode(time) {

    var formattedTime = "";

    var regex = /1[0-2](am|pm)/;
    var regex2 = /[1-9](am|pm)/;
    var regex3 = /(1[0-2]):([0-5][0-9])(am|pm)/;
    var regex4 = /([1-9]):([0-5][0-9])(am|pm)/;

    if (regex.test(time)) {
        formattedTime = time.substr(0, 2);
        formattedTime += ":00";

    }
    else if (regex2.test(time)) {
        formattedTime += "0";
        formattedTime += time.substr(0, 1);
        formattedTime += ":00";
    }
    else if (regex3.test(time)) {
        formattedTime = time.substr(0, 2);
        formattedTime += ":" + time.substr(3, 2);
    }
    else if (regex4.test(time)) {
        formattedTime = "0" + time.substr(0, 1);
        formattedTime += ":" + time.substr(2, 2);
    }

    var hour = parseInt(formattedTime.substr(0, 2));

    if (time.indexOf("am") > -1) {
        if (hour === 12) {
            hour = 0;
        }
    }
    else if (time.indexOf("pm") > -1) {

        if (hour !== 12) {
            hour += 12;
        }

    }

    if (hour < 10) {
        hour = "0" + hour;
    }

    formattedTime = hour + formattedTime.substr(2);

    return formattedTime;
}