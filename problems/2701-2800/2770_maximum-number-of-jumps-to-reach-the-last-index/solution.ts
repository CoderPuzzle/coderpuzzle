function maximumJumps(nums: number[], target: number): number {
    // dp[j] = max jumps to reach j (-1 = unreachable). Every edge i -> j
    // has i < j, so the jump graph is a DAG in index order and one
    // ascending sweep relaxes every edge exactly once.
    const n = nums.length;
    const dp: number[] = new Array(n).fill(-1);
    dp[0] = 0;
    for (let j = 1; j < n; ++j) {
        let best = -1;
        for (let i = 0; i < j; ++i) {
            if (dp[i] === -1) continue;
            // Values stay within +-2e9, far below 2^53, so the subtraction
            // and comparison are exact.
            const diff = nums[j] - nums[i];
            if (-target <= diff && diff <= target && dp[i] + 1 > best) {
                best = dp[i] + 1;
            }
        }
        dp[j] = best;
    }
    return dp[n - 1];
}
