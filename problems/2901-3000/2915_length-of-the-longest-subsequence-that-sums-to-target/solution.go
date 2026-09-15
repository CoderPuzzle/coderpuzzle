func lengthOfLongestSubsequence(nums []int, target int) int {
	// dp[s] holds the longest subsequence length that sums exactly to s,
	// or -1 when s is unreachable. Sums never exceed target <= 1000, so
	// one flat array carries the whole state.
	dp := make([]int, target+1)
	for s := range dp {
		dp[s] = -1
	}
	dp[0] = 0
	for _, num := range nums {
		// Walk s downward so each element contributes at most once
		// (0-1 knapsack, not unbounded).
		for s := target; s >= num; s-- {
			if dp[s-num] != -1 && dp[s-num]+1 > dp[s] {
				dp[s] = dp[s-num] + 1
			}
		}
	}
	return dp[target]
}
