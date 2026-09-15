/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
    // Sorted copy: duplicates become neighbours and every maximal chain
    // becomes one contiguous run of +1 steps, so a single walk measures
    // them all.
    const ordered = [...nums].sort((a, b) => a - b);
    let best = 0;
    let run = 0;
    let previous = null;
    for (const value of ordered) {
        if (previous === null || value > previous + 1) {
            // A gap of two or more (or the very first entry) starts a
            // fresh chain.
            run = 1;
        } else if (value === previous + 1) {
            run += 1;
        }
        // An equal value is a duplicate of one already counted: the run
        // keeps its length.
        previous = value;
        best = Math.max(best, run);
    }
    // An empty array never enters the loop, so 0 falls out for free.
    return best;
};
