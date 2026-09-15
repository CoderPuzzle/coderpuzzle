/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minGroups = function (intervals) {
    const starts = intervals.map((x) => x[0]).sort((a, b) => a - b);
    const ends = intervals.map((x) => x[1]).sort((a, b) => a - b);
    // Answer = peak coverage depth: intervals sharing a point pairwise
    // intersect, so they need distinct groups, and peak depth suffices.
    // Only openings can create depth, so stop once starts are used up.
    let groups = 0;
    let active = 0;
    let i = 0;
    let j = 0;
    const n = starts.length;
    while (i < n) {
        // '<=' keeps touching intervals ([1,5],[5,8]) overlapping —
        // the opening at ends[j] is processed before that close.
        if (starts[i] <= ends[j]) {
            active += 1;
            if (active > groups) {
                groups = active;
            }
            i += 1;
        } else {
            active -= 1;
            j += 1;
        }
    }
    return groups;
};
