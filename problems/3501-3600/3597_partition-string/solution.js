/**
 * @param {string} s
 * @return {string[]}
 */
var partitionString = function (s) {
    // Greedy replay of the procedure: grow the current segment one
    // character at a time and emit it the first moment it is not in the
    // seen set, then start a new segment at the next index. A tail that
    // reaches the end of s while still seen is never emitted — the loop
    // simply ends (Example 2's final "a" is dropped).
    const segments = [];
    const seen = new Set();
    let start = 0;
    for (let stop = 1; stop <= s.length; ++stop) {
        const candidate = s.slice(start, stop);
        if (!seen.has(candidate)) {
            seen.add(candidate);
            segments.push(candidate);
            start = stop;
        }
    }
    return segments;
};
