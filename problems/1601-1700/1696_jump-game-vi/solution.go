func maxResult(nums []int, k int) int64 {
	n := len(nums)
	dp := make([]int64, n)
	dp[0] = int64(nums[0])
	window := []int{0}
	// The deque holds indices with strictly decreasing dp values; it turns
	// dp[i] = nums[i] + max(dp[i-k .. i-1]) into a sliding-window maximum
	// answered in amortized O(1) per step.
	for i := 1; i < n; i++ {
		// Expire front indices that left the [i-k, i-1] hop window; the
		// front is then exactly the window's maximum.
		for window[0] < i-k {
			window = window[1:]
		}
		dp[i] = int64(nums[i]) + dp[window[0]]
		// Back entries with dp <= dp[i] can never be a window max again
		// while i is alive; <= also collapses equal scores.
		for len(window) > 0 && dp[window[len(window)-1]] <= dp[i] {
			window = window[:len(window)-1]
		}
		window = append(window, i)
	}
	return dp[n-1]
}
