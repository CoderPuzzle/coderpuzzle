/**
 * @param {number[]} nums
 * @param {number[]} cost
 * @return {number}
 */
var minCost = function (nums, cost) {
    const n = nums.length;
    const idx = Array.from({ length: n }, (_, i) => i);
    idx.sort((a, b) => nums[a] - nums[b]);
    // The cost sum(|nums[i]-t|*cost[i]) is convex piecewise-linear in t;
    // its slope flips where cumulative cost crosses half the total, so
    // the optimum is the weighted median.
    let total = 0;
    for (const c of cost) total += c;
    const target = Math.floor((total + 1) / 2);
    let prefix = 0;
    let median = nums[idx[n - 1]];
    // Walk sorted values until the prefix weight reaches ceil(total/2);
    // >= with the +1 picks the lower median on an even split (same cost).
    for (const i of idx) {
        prefix += cost[i];
        if (prefix >= target) {
            median = nums[i];
            break;
        }
    }
    // Evaluate the convex cost at the median; it lies at a breakpoint (an
    // existing value), so restricting to nums values loses nothing.
    let ans = 0;
    for (const i of idx) {
        ans += Math.abs(nums[i] - median) * cost[i];
    }
    return ans;
};
