/**
 * @param {string[]} words
 * @return {number}
 */
var maxDistance = function (words) {
    // When the outermost words already differ, that pair spans the whole
    // array and nothing can beat it.
    const n = words.length;
    if (words[0] !== words[n - 1]) {
        return n;
    }
    // The ends share one word, so any word differing from it pairs with
    // whichever end it does not sit at: the first such index widens the
    // pair with the last slot, the last such index widens the pair with
    // slot 0, and each scan can stop at its first hit.
    let best = 0;
    for (let i = 0; i < n; ++i) {
        if (words[i] !== words[0]) {
            best = n - i;
            break;
        }
    }
    for (let j = n - 1; j >= 0; --j) {
        if (words[j] !== words[n - 1]) {
            best = Math.max(best, j + 1);
            break;
        }
    }
    // No differing word at all means every word is equal.
    return best;
};
