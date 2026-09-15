/**
 * @param {string} s
 * @return {boolean}
 */
var areOccurrencesEqual = function (s) {
    // Every present character must share one frequency, so the set of the
    // per-character counts has size one.
    const counts = new Map();
    for (const ch of s) {
        counts.set(ch, (counts.get(ch) || 0) + 1);
    }
    return new Set(counts.values()).size === 1;
};
