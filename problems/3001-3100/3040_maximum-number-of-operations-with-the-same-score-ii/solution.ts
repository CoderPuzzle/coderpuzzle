function maxOperations(nums: number[]): number {
    const n = nums.length;

    const maxForScore = (score: number): number => {
        // dp[l][r] = max deletions inside nums[l..r] achieving `score`
        const dp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
        for (let length = 2; length <= n; length++) {
            for (let l = 0; l + length <= n; l++) {
                const r = l + length - 1;
                let best = 0;
                if (nums[l] + nums[l + 1] === score) {
                    best = Math.max(best, 1 + (l + 2 <= r ? dp[l + 2][r] : 0));
                }
                if (nums[r] + nums[r - 1] === score) {
                    best = Math.max(best, 1 + (l + 2 <= r ? dp[l][r - 2] : 0));
                }
                if (nums[l] + nums[r] === score) {
                    best = Math.max(best, 1 + (l + 2 <= r ? dp[l + 1][r - 1] : 0));
                }
                dp[l][r] = best;
            }
        }
        return dp[0][n - 1];
    };

    const candidates = new Set([nums[0] + nums[1], nums[n - 1] + nums[n - 2], nums[0] + nums[n - 1]]);
    let ans = 0;
    for (const score of candidates) {
        ans = Math.max(ans, maxForScore(score));
    }
    return ans;
}
