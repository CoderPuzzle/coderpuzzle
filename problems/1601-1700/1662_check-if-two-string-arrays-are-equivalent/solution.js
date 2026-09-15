/**
 * @param {string[]} word1
 * @param {string[]} word2
 * @return {boolean}
 */
var arrayStringsAreEqual = function (word1, word2) {
    // Walk both arrays with an array index plus an offset inside the
    // current element: the two concatenated streams are compared one
    // character at a time, never materialized.
    let array1 = 0;
    let offset1 = 0;
    let array2 = 0;
    let offset2 = 0;
    while (array1 < word1.length && array2 < word2.length) {
        if (word1[array1][offset1] !== word2[array2][offset2]) {
            return false;
        }
        if (++offset1 === word1[array1].length) {
            array1++;
            offset1 = 0;
        }
        if (++offset2 === word2[array2].length) {
            array2++;
            offset2 = 0;
        }
    }
    // Equal only if both walks exhausted together: an unfinished array
    // means its concatenation is strictly longer.
    return array1 === word1.length && array2 === word2.length;
};
