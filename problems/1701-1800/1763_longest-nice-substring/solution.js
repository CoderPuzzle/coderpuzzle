/**
 * @param {string} s
 * @return {string}
 */
var longestNiceSubstring = function (s) {
    // A character missing its case-partner anywhere in the string
    // can never sit inside a nice window: split on every offender
    // and recurse. Segments with no offenders are entirely nice.
    if (s.length < 2) {
        return "";
    }
    const swap = (c) => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase());
    for (let i = 0; i < s.length; i++) {
        if (!s.includes(swap(s[i]))) {
            const left = longestNiceSubstring(s.slice(0, i));
            const right = longestNiceSubstring(s.slice(i + 1));
            return left.length >= right.length ? left : right;
        }
    }
    return s;
};
