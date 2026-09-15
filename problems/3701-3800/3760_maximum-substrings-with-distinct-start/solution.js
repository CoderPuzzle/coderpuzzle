/**
 * @param {string} s
 * @return {number}
 */
var maxDistinctStarts = function (s) {
    // A piece is decided by its start: scanning left to right, the current
    // letter may open a new piece exactly when no earlier piece already
    // started with it. Accepting it costs only that one letter's
    // availability, and each letter starts at most one piece anyway, so the
    // greedy never blocks a better split.
    const seen = new Set();
    for (const ch of s) {
        seen.add(ch);
    }
    return seen.size;
};
