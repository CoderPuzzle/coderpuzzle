function lengthOfLongestSubsequence(nums: number[], target: number): number {
    // dp[s] holds the longest subsequence length that sums exactly to s,
    // or -1 when s is unreachable. Sums never exceed target <= 1000, so
    // one flat array carries the whole state.
    const dp: number[] = new Array<number>(target + 1).fill(-1);
    dp[0] = 0;
    for (const num of nums) {
        // Walk s downward so each element contributes at most once
        // (0-1 knapsack, not unbounded).
        for (let s = target; s >= num; --s) {
            if (dp[s - num] !== -1 && dp[s - num] + 1 > dp[s]) {
                dp[s] = dp[s - num] + 1;
            }
        }
    }
    return dp[target];
}
