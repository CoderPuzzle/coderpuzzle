/**
 * @param {number} n
 * @param {number[]} ranges
 * @return {number}
 */
var minTaps = function (n, ranges) {
    // Each tap becomes the interval [i-r, i+r] clamped to [0, n]; the task
    // is the classic minimum-interval-cover of the garden segment.
    // Sorting by left endpoint makes the sweep a single pass.
    const intervals = ranges
        .map((r, i) => [Math.max(0, i - r), Math.min(n, i + r)])
        .sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
    let count = 0;
    let covered = 0;
    let i = 0;
    const total = intervals.length;
    while (covered < n) {
        // Among all intervals that start at or before the watered prefix,
        // take the farthest reach — the jump-game argument: any solution
        // must cross the current boundary, and the farthest reach leaves
        // the most room for the remaining cover.
        let reach = covered;
        while (i < total && intervals[i][0] <= covered) {
            reach = Math.max(reach, intervals[i][1]);
            // Once an interval's start exceeds `covered` it exceeds every
            // earlier value too, so i is never revisited.
            i++;
        }
        if (reach === covered) {
            // No interval connects to the watered prefix: unwatered gap.
            return -1;
        }
        covered = reach;
        count++;
    }
    return count;
};
