/**
 * @param {string[]} words
 * @param {string} s
 * @return {boolean}
 */
var isAcronym = function (words, s) {
    // Collect the first character of every word, join them in order, and
    // compare the joined acronym with s. Strict equality fails on unequal
    // lengths just as it does on any differing character.
    let acronym = "";
    for (const word of words) {
        acronym += word[0];
    }
    return acronym === s;
};
