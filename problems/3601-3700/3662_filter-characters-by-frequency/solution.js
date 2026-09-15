/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var filterCharacters = function (s, k) {
    // Tally every occurrence into a Map keyed by the raw character; a Map
    // avoids the string-coercion and prototype-key pitfalls of a plain
    // object used as a lookup table.
    const counts = new Map();
    for (const ch of s) {
        counts.set(ch, (counts.get(ch) ?? 0) + 1);
    }
    // Scan left to right, keeping exactly the characters whose total count
    // is strictly below the threshold; original order falls out of the
    // scan for free.
    let result = "";
    for (const ch of s) {
        if (counts.get(ch) < k) {
            result += ch;
        }
    }
    return result;
};
