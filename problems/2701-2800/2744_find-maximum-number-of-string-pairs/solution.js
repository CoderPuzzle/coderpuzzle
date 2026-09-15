/**
 * @param {string[]} words
 * @return {number}
 */
var maximumNumberOfStringPairs = function (words) {
    // A word pairs only with its reversal among earlier words: look up
    // before inserting, so a word can never pair with itself. Distinct
    // strings make each candidate partner unique, so counting every hit
    // is optimal — palindromes can never find an earlier copy at all.
    const seen = new Set();
    let pairs = 0;
    for (const word of words) {
        const reversed = word.split("").reverse().join("");
        if (seen.has(reversed)) {
            ++pairs;
        }
        seen.add(word);
    }
    return pairs;
};
