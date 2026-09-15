/**
 * @param {string} s
 * @return {number}
 */
var maxSameLengthRuns = function (s) {
    // One scan cuts s into maximal equal-letter runs; the answer is the
    // largest number of runs that share a single length.
    const counts = new Map();
    const n = s.length;
    let i = 0;
    while (i < n) {
        let j = i;
        while (j < n && s.charCodeAt(j) === s.charCodeAt(i)) {
            j++;
        }
        const length = j - i;
        counts.set(length, (counts.get(length) || 0) + 1);
        i = j;
    }
    let best = 0;
    for (const count of counts.values()) {
        best = Math.max(best, count);
    }
    return best;
};
