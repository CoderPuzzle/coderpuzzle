func lengthOfLIS(nums []int) int {
	n := len(nums)
	// dp[i] = length of the longest increasing subsequence ending exactly
	// at i; the global answer is the max over all endings.
	dp := make([]int, n)
	answer := 0
	for i := 0; i < n; i++ {
		dp[i] = 1
		// Every earlier smaller element can precede nums[i], so extend the
		// best of those chains by one.
		for j := 0; j < i; j++ {
			if nums[j] < nums[i] && dp[j]+1 > dp[i] {
				dp[i] = dp[j] + 1
			}
		}
		answer = max(answer, dp[i])
	}
	return answer
}
