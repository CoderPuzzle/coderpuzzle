/**
 * @param {string} sentence
 * @return {boolean}
 */
var checkIfPangram = function (sentence) {
    // A sentence is a pangram exactly when its set of distinct characters
    // is the whole lowercase alphabet, so collect the distinct characters
    // and compare the set's size with 26.
    const seen = new Set();
    for (const c of sentence) {
        seen.add(c);
        if (seen.size === 26) {
            return true;
        }
    }
    return false;
};
