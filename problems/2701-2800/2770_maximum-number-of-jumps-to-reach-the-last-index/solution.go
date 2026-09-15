func maximumJumps(nums []int, target int) int {
	// dp[j] = max jumps to reach j (-1 = unreachable). Every edge i -> j
	// has i < j, so the jump graph is a DAG in index order and one
	// ascending sweep relaxes every edge exactly once.
	n := len(nums)
	dp := make([]int, n)
	dp[0] = 0
	for j := 1; j < n; j++ {
		best := -1
		for i := 0; i < j; i++ {
			if dp[i] == -1 {
				continue
			}
			// Widen before subtracting: the gap can reach +-2e9, the very
			// edge of the int range under the stated constraints.
			diff := int64(nums[j]) - int64(nums[i])
			if diff >= -int64(target) && diff <= int64(target) && dp[i]+1 > best {
				best = dp[i] + 1
			}
		}
		dp[j] = best
	}
	return dp[n-1]
}
