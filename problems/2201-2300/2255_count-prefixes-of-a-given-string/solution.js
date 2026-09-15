/**
 * @param {string[]} words
 * @param {string} s
 * @return {number}
 */
var countPrefixes = function (words, s) {
    let count = 0;
    for (const word of words) {
        if (s.startsWith(word)) {
            count++;
        }
    }
    return count;
};
