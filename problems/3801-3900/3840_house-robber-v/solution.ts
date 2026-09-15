function rob(nums: number[], colors: number[]): number {
    // Bounds: n <= 10^5 and nums[i] <= 10^5, so the rob-everything extreme
    // reaches 10^10 < 2^53 — every sum along the way stays exact in JS
    // numbers.
    // prev1/prev2 carry dp[i-1]/dp[i-2]: the best haul from houses up to
    // i-1 / i-2. dp is monotone, so when colors differ the adjacent take
    // nums[i] + dp[i-1] dominates the non-adjacent nums[i] + dp[i-2].
    let prev2 = 0;
    let prev1 = nums[0];
    for (let i = 1; i < nums.length; i++) {
        const base = colors[i] === colors[i - 1] ? prev2 : prev1;
        const take = nums[i] + base;
        let best = prev1;
        if (take > best) {
            best = take;
        }
        prev2 = prev1;
        prev1 = best;
    }
    return prev1;
}
