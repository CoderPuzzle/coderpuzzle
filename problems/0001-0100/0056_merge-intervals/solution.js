/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
    // Copy, then sort by start (end as tiebreaker): any interval
    // overlapping an earlier one must overlap or touch the most recent
    // merged interval, so a sweep tracking only the last merged
    // interval suffices. Sorting the copy leaves the input untouched.
    const ordered = [...intervals].sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));
    const merged = [];
    for (const [start, end] of ordered) {
        // `<=` counts touching intervals as overlapping, as required.
        // The start is already covered, so only the right edge matters.
        if (merged.length && start <= merged[merged.length - 1][1]) {
            // Raise the right edge when larger; an interval fully
            // swallowed by the merge leaves it untouched.
            if (end > merged[merged.length - 1][1]) {
                merged[merged.length - 1][1] = end;
            }
        } else {
            // No overlap with the last merged interval: new group.
            merged.push([start, end]);
        }
    }
    return merged;
};
