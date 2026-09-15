/**
 * @param {number[][]} intervals
 * @param {number} k
 * @return {number}
 */
var minConnectedGroups = function (intervals, k) {
    // Only the merged components matter: sort the intervals, merge the
    // overlapping ones, and the answer is the component count minus the
    // largest number of consecutive components one new interval can
    // straddle. A new interval of length at most k joins components l
    // through r exactly when their end-to-end span, c_r.start - c_l.end,
    // is at most k (the interval must reach across every component in
    // between, not just the empty gaps). Both endpoint bounds move
    // monotonically, so two pointers find the widest valid window:
    // advance the right end and shrink from the left while the span
    // exceeds k.
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [];
    for (const [start, end] of intervals) {
        if (merged.length > 0 && start <= merged[merged.length - 1][1]) {
            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], end);
        } else {
            merged.push([start, end]);
        }
    }
    let best = 0;
    let left = 0;
    for (let right = 0; right < merged.length; right += 1) {
        while (merged[right][0] - merged[left][1] > k) {
            left += 1;
        }
        best = Math.max(best, right - left);
    }
    return merged.length - best;
};
