/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
var findRightInterval = function (intervals) {
    // The right interval question is a lower-bound query: pair each
    // start with its index, sort by start, and the answer for an end is
    // the first pair whose start reaches it.
    const order = intervals.map((interval, i) => [interval[0], i]);
    order.sort((a, b) => a[0] - b[0]);
    const starts = order.map((pair) => pair[0]);
    const result = [];
    for (const [, end] of intervals) {
        // Smallest slot whose start is >= end; starts.length if none. The
        // kept half always contains that boundary, so the window halves
        // until only the boundary is left.
        let lo = 0;
        let hi = starts.length;
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (starts[mid] < end) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        // i may equal j: an end its own start already reaches finds the
        // interval itself; off the end means no start qualifies.
        result.push(lo < starts.length ? order[lo][1] : -1);
    }
    return result;
};
