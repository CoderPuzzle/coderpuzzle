/**
 * @param {string} word
 * @return {boolean}
 */
var equalFrequency = function (word) {
    // Count all 26 letters, then try removing one occurrence of each
    // present letter and test whether the surviving frequencies collapse
    // to a single value. 26 candidates x O(26) check.
    const freq = new Array(26).fill(0);
    for (const ch of word) {
        ++freq[ch.charCodeAt(0) - 97];
    }
    for (let c = 0; c < 26; ++c) {
        if (freq[c] === 0) {
            continue;
        }
        --freq[c];
        const remaining = new Set();
        for (const f of freq) {
            if (f > 0) {
                remaining.add(f);
            }
        }
        if (remaining.size <= 1) {
            return true;
        }
        ++freq[c];
    }
    return false;
};
