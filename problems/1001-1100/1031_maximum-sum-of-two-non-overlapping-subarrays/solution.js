/**
 * @param {number[]} nums
 * @param {number} firstLen
 * @param {number} secondLen
 * @return {number}
 */
var maxSumTwoNoOverlap = function (nums, firstLen, secondLen) {
    const n = nums.length;
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }

    // Sweep every position where the trailing window could end, tracking
    // the best leading window that ends at or before the trailing
    // window's start (so the two never overlap, whether they touch or
    // leave a gap between them).
    const best = (lead, trail) => {
        let maxLead = 0;
        let result = 0;
        for (let end = lead + trail; end <= n; end++) {
            const leadSum = prefix[end - trail] - prefix[end - trail - lead];
            maxLead = Math.max(maxLead, leadSum);
            const trailSum = prefix[end] - prefix[end - trail];
            result = Math.max(result, maxLead + trailSum);
        }
        return result;
    };

    // Try both relative orders: firstLen before secondLen, and secondLen
    // before firstLen. Skipping either one silently misses inputs where
    // the better placement runs the other way.
    return Math.max(best(firstLen, secondLen), best(secondLen, firstLen));
};
