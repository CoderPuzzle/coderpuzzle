function lengthOfLIS(nums: number[]): number {
    const n = nums.length;
    // dp[i] = length of the longest increasing subsequence ending exactly
    // at i; the global answer is the max over all endings.
    const dp: number[] = new Array(n).fill(1);
    let answer = 1;
    for (let i = 0; i < n; i++) {
        // Every earlier smaller element can precede nums[i], so extend the
        // best of those chains by one.
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
            }
        }
        answer = Math.max(answer, dp[i]);
    }
    return answer;
}
