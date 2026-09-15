/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var shortestSubarray = function (nums, k) {
    const n = nums.length;
    // Negatives break the sliding-window trick, so reason in
    // prefix sums: a subarray sum is prefix[i] - prefix[j], and
    // the sentinel prefix[0] = 0 lets subarrays starting at 0
    // compete.
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    // Array-based deque of start indices whose prefix sums strictly
    // increase front to back; head indexes the front.
    const dq = [];
    let head = 0;
    let best = n + 1;
    for (let i = 0; i <= n; i++) {
        const p = prefix[i];
        // Consume qualifying fronts: each offers length i - front,
        // and popping is safe because later ends only lengthen the
        // same start.
        while (head < dq.length && prefix[dq[head]] <= p - k) {
            best = Math.min(best, i - dq[head]);
            head++;
        }
        // A later index with an equal-or-smaller prefix dominates
        // as a future start, so trim the tail.
        while (head < dq.length && prefix[dq[dq.length - 1]] >= p) {
            dq.pop();
        }
        dq.push(i);
    }
    return best <= n ? best : -1;
};
