/**
 * @param {string} word
 * @return {number}
 */
var maxSubstrings = function (word) {
    // Substrings may not share an index, so this is interval scheduling:
    // taking the earliest-finishing valid substring at each step can
    // never push a later choice further right. Scan once, remember each
    // letter's first index inside the current window, and when the
    // running index reaches 3 past it, take that substring and restart
    // the window just past its end.
    const first = new Array(26).fill(-1);
    let count = 0;
    for (let i = 0; i < word.length; i++) {
        const c = word.charCodeAt(i) - 97;
        if (first[c] < 0) first[c] = i;
        if (i - first[c] >= 3) {
            count++;
            first.fill(-1);
        }
    }
    return count;
};
