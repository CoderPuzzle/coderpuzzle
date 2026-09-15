/**
 * @param {string[]} words
 * @param {number[]} weights
 * @return {string}
 */
var mapWordWeights = function (words, weights) {
    // Each word's weight is the sum of its characters' entries in
    // weights — at most 10 chars * 100 = 1000, comfortably inside a
    // machine int. Reflecting that total's residue mod 26 down from
    // 'z' gives one letter per word (0 -> 'z', 1 -> 'y', ..., 25 -> 'a').
    let result = "";
    for (const word of words) {
        let total = 0;
        for (let i = 0; i < word.length; ++i) {
            total += weights[word.charCodeAt(i) - 97];
        }
        result += String.fromCharCode(122 - (total % 26));
    }
    return result;
};
