/**
 * @param {string} str1
 * @param {string} str2
 * @return {boolean}
 */
var canMakeSubsequence = function (str1, str2) {
    // Walk str1 once with a pointer into str2. Whenever str2[j] equals
    // str1[i], or equals its cyclic successor, take the pair and advance
    // both pointers: claiming the earliest eligible slot never displaces
    // a better later choice, because everything that fits after it also
    // fits after any other valid pick. Matching all of str2 this way is
    // exactly what was asked for.
    let j = 0;
    for (let i = 0; i < str1.length; ++i) {
        if (j < str2.length && (str2.charCodeAt(j) - str1.charCodeAt(i) + 26) % 26 <= 1) {
            j++;
        }
    }
    return j === str2.length;
};
