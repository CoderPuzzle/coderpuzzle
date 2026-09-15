/**
 * @param {string} s
 * @return {number}
 */
var minOperations = function (s) {
    // Exactly two alternating targets exist; each position matches
    // one of them, so one mismatch count against the 0101... target
    // determines both costs.
    let mismatch = 0;
    for (let i = 0; i < s.length; i++) {
        if (Number(s[i]) !== i % 2) {
            mismatch++;
        }
    }
    return Math.min(mismatch, s.length - mismatch);
};
