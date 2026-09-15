/**
 * @param {string} word
 * @return {number}
 */
var longestBeautifulSubstring = function (word) {
    // One pass over vowel runs. A beautiful substring is a maximal run of
    // non-decreasing vowels containing all five; extend the run while the
    // next vowel is >= the current one, then score it.
    const ORDER = "aeiou";
    let best = 0;
    const n = word.length;
    let i = 0;
    while (i < n) {
        if (word[i] !== "a") {
            i++;
            continue;
        }
        let seen = 1; // bit 0 set: 'a' present
        let j = i + 1;
        while (j < n && word[j] >= word[j - 1]) {
            seen |= 1 << ORDER.indexOf(word[j]);
            j++;
        }
        if (seen === 31) {
            best = Math.max(best, j - i);
        }
        i = j > i ? j : i + 1;
    }
    return best;
};
