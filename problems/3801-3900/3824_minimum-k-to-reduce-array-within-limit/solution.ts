// An element v needs ceil(v / k) reduce-by-k operations, so
// nonPositive(nums, k) is the sum of those ceilings. Feasibility is
// monotone in k: every ceiling only shrinks as k grows while k * k
// strictly grows, so binary search finds the smallest feasible k.
// Totals reach 1e5 * 1e5 = 1e10 and squares of k reach 1e10 as well —
// beyond 2^31, but every integer here sits far inside the 2^53 exact
// range of doubles, so the arithmetic is exact.
function minimumK(nums: number[]): number {
    const feasible = (k: number): boolean => {
        let total = 0;
        for (const value of nums) total += Math.floor((value + k - 1) / k);
        return total <= k * k;
    };
    // Warm-up: once k >= max(nums) every ceiling is exactly 1, so
    // nonPositive(nums, k) == n there; doubling max(nums) until feasible
    // stops at the first power-of-two multiple with k * k >= n.
    let hi = 0;
    for (const value of nums) if (value > hi) hi = value;
    while (!feasible(hi)) hi *= 2;
    let lo = 1;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (feasible(mid)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
