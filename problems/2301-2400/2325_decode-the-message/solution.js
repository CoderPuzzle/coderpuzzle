/**
 * @param {string} key
 * @param {string} message
 * @return {string}
 */
var decodeMessage = function (key, message) {
    // First appearances in key fill the substitution table in order,
    // each new letter taking the next alphabet letter; spaces map to
    // spaces, then message is translated through the table.
    const table = new Map([[" ", " "]]);
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let next = 0;
    for (const ch of key) {
        if (!table.has(ch)) {
            table.set(ch, alphabet[next]);
            next++;
        }
    }
    const out = [];
    for (const ch of message) {
        out.push(table.get(ch));
    }
    return out.join("");
};
