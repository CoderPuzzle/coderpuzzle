/**
 * n can be 10^9, so nothing may touch cells directly. Sorting by start
 * and sweeping a cursor turns every stretch the cursor skips over into
 * one maximal uncovered range: a gap is emitted whenever the next sorted
 * range begins beyond the cursor, and the cursor then jumps past that
 * range's end (overlaps merge implicitly).
 * @param {number} n
 * @param {number[][]} ranges
 * @return {number[][]}
 */
var findMaximalUncoveredRanges = function (n, ranges) {
    const rs = [...ranges].sort((a, b) => a[0] - b[0]);
    const res = [];
    let cur = 0;
    for (const [s, e] of rs) {
        if (s > cur) {
            // Cells [cur, s - 1] meet no covering range.
            res.push([cur, s - 1]);
        }
        if (e + 1 > cur) cur = e + 1;
    }
    if (cur < n) res.push([cur, n - 1]);
    return res;
};
