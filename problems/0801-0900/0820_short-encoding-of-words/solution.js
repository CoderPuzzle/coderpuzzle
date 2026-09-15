/**
 * @param {string[]} words
 * @return {number}
 */
var minimumLengthEncoding = function (words) {
    // A word needs no slot of its own when another word ends with
    // it: start from every word, then discard strict suffixes.
    const keep = new Set(words);
    for (const w of words) {
        // Only proper suffixes (k >= 1) are removed, so w itself —
        // and duplicates of it — survive to share a single slot.
        for (let k = 1; k < w.length; k++) {
            keep.delete(w.substring(k));
        }
    }
    // Survivors are exactly the words no other word ends with; each
    // pays len + 1 for its terminating '#'.
    let total = 0;
    for (const w of keep) {
        total += w.length + 1;
    }
    return total;
};
