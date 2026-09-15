/**
 * For a fixed left end the window gcd only ever decreases as the window
 * grows, and every drop at least halves it, so each left end owns only
 * O(log(max(nums))) distinct gcd values. Keeping one (gcd, furthest right
 * end) entry per value turns the sweep into a merge of two short lists.
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxGcdSum = function (nums, k) {
    const gcd = (a, b) => {
        while (b !== 0) {
            const rest = a % b;
            a = b;
            b = rest;
        }
        return a;
    };
    const n = nums.length;
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; ++i) prefix[i + 1] = prefix[i] + nums[i];
    let best = 0;
    // Distinct gcd values among windows starting at lo, decreasing, each
    // with its furthest right end. Prefix sums stay <= 10^11 and the
    // products never exceed the case answers, exact in a double.
    let gs = [];
    let rs = [];
    for (let lo = n - 1; lo >= 0; --lo) {
        const ng = [nums[lo]];
        const nr = [lo];
        for (let t = 0; t < gs.length; ++t) {
            const merged = gcd(gs[t], nums[lo]);
            if (merged === ng[ng.length - 1]) {
                nr[nr.length - 1] = rs[t];
            } else {
                ng.push(merged);
                nr.push(rs[t]);
            }
        }
        gs = ng;
        rs = nr;
        for (let t = 0; t < gs.length; ++t) {
            if (rs[t] - lo + 1 >= k) {
                // Positive elements: the longest window with this gcd has
                // the largest sum.
                const candidate = gs[t] * (prefix[rs[t] + 1] - prefix[lo]);
                if (candidate > best) best = candidate;
            }
        }
    }
    return best;
};
