/**
 * @param {number[]} target
 * @param {number[]} arr
 * @return {number}
 */
var minOperations = function (target, arr) {
    // Answer = target.length - LCS: each target element not kept costs one
    // insertion. target has distinct values, so rewriting arr as target
    // indices turns the LCS into a longest strictly increasing run.
    const index = new Map();
    for (let i = 0; i < target.length; i++) {
        index.set(target[i], i);
    }
    // Patience sorting: tails[k] = smallest tail of an increasing
    // subsequence of length k+1; the lower bound keeps it strictly
    // increasing (duplicate arr values map to one index and replace).
    const tails = [];
    for (const value of arr) {
        // Absent values never join a common subsequence and may stay.
        if (!index.has(value)) continue;
        const v = index.get(value);
        // binary search for lower bound of v in tails
        let lo = 0,
            hi = tails.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (tails[mid] < v) lo = mid + 1;
            else hi = mid;
        }
        if (lo === tails.length) tails.push(v);
        else tails[lo] = v;
    }
    return target.length - tails.length;
};
