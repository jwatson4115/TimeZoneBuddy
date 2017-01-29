/* Takes a time zone abbreviation (such as "EDT")
 * And returns the offset from UTC (e.g. -4) */
function getOffset(input, offset) {
    input = input.toLowerCase();

    if (input.indexOf("edt") > -1) {
        return (-4 + offset);
    } else if (input.indexOf("est") > -1) {
        return (-5 + offset);
    } else if (input.indexOf("gmt") > -1) {
        return (0 + offset);
    } else if (input.indexOf("bst") > -1) {
        return (1 + offset);
    } else {
        return 0;
    }
}