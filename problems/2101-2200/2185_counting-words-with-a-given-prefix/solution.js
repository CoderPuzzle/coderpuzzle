/**
 * @param {string[]} words
 * @param {string} pref
 * @return {number}
 */
var prefixCount = function (words, pref) {
    // Straight scan: count the words whose leading characters match pref
    // exactly.
    let count = 0;
    for (const word of words) {
        if (word.startsWith(pref)) {
            ++count;
        }
    }
    return count;
};
