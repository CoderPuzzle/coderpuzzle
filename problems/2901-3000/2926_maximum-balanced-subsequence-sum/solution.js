/**
 * @param {number[]} nums
 * @return {number}
 */
var maxBalancedSubsequenceSum = function (nums) {
    // Balance rearranges to nums[j] - j >= nums[i] - i, so a subsequence is
    // balanced precisely when b[i] = nums[i] - i is non-decreasing along it.
    // Compress b into ranks to key the Fenwick tree.
    const n = nums.length;
    const vals = new Array(n);
    for (let i = 0; i < n; i++) vals[i] = nums[i] - i;
    const comp = Array.from(new Set(vals)).sort((a, b) => a - b);
    const m = comp.length;
    const idxOf = new Map();
    for (let i = 0; i < m; i++) idxOf.set(comp[i], i + 1);

    // Max-flavored Fenwick tree (update propagates dp values upward, query
    // takes the best dp among ranks <= i), initialized to zero — which
    // implements the max(0, ...) cutoff: a single element is always a
    // balanced subsequence, so negative predecessors are ignored and each
    // element may start fresh.
    const bit = new Array(m + 1).fill(0);

    function update(i, value) {
        while (i <= m) {
            if (value > bit[i]) bit[i] = value;
            i += i & -i;
        }
    }

    function query(i) {
        let best = 0;
        while (i > 0) {
            if (bit[i] > best) best = bit[i];
            i -= i & -i;
        }
        return best;
    }

    let ans = null;
    for (let i = 0; i < n; i++) {
        // dp[i] = nums[i] + best predecessor dp with rank <= j. Ties are
        // fine since equal b values satisfy the rearranged inequality, so
        // the query includes i's own rank.
        const j = idxOf.get(vals[i]);
        const best = query(j);
        const dp = best <= 0 ? nums[i] : nums[i] + best;
        if (ans === null || dp > ans) ans = dp;
        update(j, dp);
    }
    return ans;
};
