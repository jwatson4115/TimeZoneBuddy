replaceTextInHtml(getTimeZoneRegex(), 'found');

/* Replaces all occurences of a piece of text in an html with another */
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