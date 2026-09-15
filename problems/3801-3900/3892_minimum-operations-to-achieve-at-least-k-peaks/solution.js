/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperations = function (nums, k) {
    // A peak's two neighbours (circular) can never themselves be peaks, so they
    // keep their original values and making position i a peak costs
    // max(0, max(prev, nxt) + 1 - nums[i]) with original neighbour values.
    // Each cost is at most ~2*10^5 and there are at most n/2 peaks, so every
    // intermediate stays far below 2^53 and JS doubles are exact throughout.
    const n = nums.length;
    if (k === 0) return 0;
    if (k > Math.floor(n / 2)) return -1; // a circle admits at most floor(n/2) peaks
    const INF = Number.MAX_SAFE_INTEGER;
    const c = new Array(n).fill(0);
    for (let i = 1; i < n; i++) {
        const prev = i >= 2 ? nums[i - 1] : nums[0];
        const nxt = i <= n - 2 ? nums[i + 1] : nums[0];
        c[i] = Math.max(0, Math.max(prev, nxt) + 1 - nums[i]);
    }
    // Capped knapsack over positions 1..n-1: notPeak[j]/peak[j] are the cheapest
    // ways to reach j peaks (j === cap means "at least cap") with the current
    // position left unpicked / picked.
    const linear = (cap, forceStart, forceEnd) => {
        let notPeak = new Array(cap + 1).fill(INF);
        let peak = new Array(cap + 1).fill(INF);
        notPeak[0] = 0;
        if (!forceStart && cap >= 1) peak[1] = c[1];
        for (let i = 2; i < n; i++) {
            const newNot = new Array(cap + 1);
            const newPeak = new Array(cap + 1).fill(INF);
            for (let j = 0; j <= cap; j++) {
                newNot[j] = Math.min(notPeak[j], peak[j]);
            }
            // A peak needs the previous position unpicked; over cap, extra peaks
            // stay folded into the top cell.
            if (!(i === n - 1 && forceEnd)) {
                const base = c[i];
                for (let j = 1; j < cap; j++) {
                    const v = notPeak[j - 1];
                    if (v < INF) newPeak[j] = v + base;
                }
                if (cap >= 1) {
                    const v = Math.min(notPeak[cap - 1], notPeak[cap]);
                    if (v < INF) newPeak[cap] = v + base;
                }
            }
            notPeak = newNot;
            peak = newPeak;
        }
        return Math.min(notPeak[cap], peak[cap]);
    };
    // Case A: index 0 is a peak, so positions 1 and n-1 cannot be peaks.
    const cost0 = Math.max(0, Math.max(nums[n - 1], nums[1]) + 1 - nums[0]);
    const ansA = cost0 + linear(Math.max(0, k - 1), true, true);
    // Case B: index 0 stays unpicked; all other positions are free.
    const ansB = linear(k, false, false);
    const ans = Math.min(ansA, ansB);
    return ans >= INF ? -1 : ans;
};
