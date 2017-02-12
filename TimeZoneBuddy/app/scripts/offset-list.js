/* Takes a time zone abbreviation (such as "EDT")
 * And returns the offset from UTC (e.g. -4) */
function getOffset(input) {
    input = input.toLowerCase();

    if (input.indexOf("edt") > -1) {
        return (+4);
    } else if (input.indexOf("est") > -1) {
        return (-5);
    } else if (input.indexOf("gmt") > -1) {
        return (0);
    } else if (input.indexOf("bst") > -1) {
        return (1);
    } else {
        return 0;
    }
}