/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumIncompatibility = function (nums, k) {
    // Every group has exactly n/k elements and no repeated value, so a
    // group is a set of n/k indices whose values are pairwise distinct —
    // and with values in 1..n, distinctness is itself a 16-bit check.
    // Precompute every valid group once, with cost max - min, bucketed
    // under each index it contains, then run a DP over bitmasks of
    // undistributed elements: each state removes the group covering its
    // lowest remaining index, which collapses the k! orderings of one
    // partition, and a full mask no group ever reaches is the -1 case.
    const n = nums.length;
    const size = n / k;
    const total = 1 << n;
    const buckets = [];
    for (let i = 0; i < n; i++) buckets.push([]);
    const popcount = (x) => {
        x = x - ((x >> 1) & 0x5555);
        x = (x & 0x3333) + ((x >> 2) & 0x3333);
        x = (x + (x >> 4)) & 0x0f0f;
        return (x + (x >> 8)) & 0x1f;
    };
    for (let g = 0; g < total; g++) {
        if (popcount(g) !== size) continue;
        let seen = 0;
        let lo = n + 1;
        let hi = 0;
        let valid = true;
        for (let i = 0; i < n; i++) {
            if (!((g >> i) & 1)) continue;
            const vbit = 1 << (nums[i] - 1);
            if (seen & vbit) {
                valid = false;
                break;
            }
            seen |= vbit;
            lo = Math.min(lo, nums[i]);
            hi = Math.max(hi, nums[i]);
        }
        if (!valid) continue;
        for (let i = 0; i < n; i++) {
            if ((g >> i) & 1) buckets[i].push([g, hi - lo]);
        }
    }
    const INF = 1_000_000;
    const dp = new Array(total).fill(INF);
    dp[0] = 0;
    for (let mask = 1; mask < total; mask++) {
        if (popcount(mask) % size !== 0) continue;
        let best = INF;
        const low = mask & -mask;
        const bucket = buckets[31 - Math.clz32(low)];
        for (const [g, cost] of bucket) {
            if ((g & mask) === g && dp[mask ^ g] + cost < best) best = dp[mask ^ g] + cost;
        }
        dp[mask] = best;
    }
    return dp[total - 1] >= INF ? -1 : dp[total - 1];
};
