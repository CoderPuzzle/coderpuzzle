func numberOfWays(n int, x int) int {
	// A set of unique bases is exactly a choice of which distinct xth
	// powers to take, each at most once -- a counting knapsack.
	const mod = 1000000007
	dp := make([]int64, n+1)
	dp[0] = 1
	for base := int64(1); ; base++ {
		power := int64(1)
		for e := 0; e < x; e++ {
			power *= base
		}
		if power > int64(n) {
			break
		}
		// Walking the sums downward reads dp[sum-power] at its pre-power
		// value, so no subset takes this power twice.
		for total := n; total >= int(power); total-- {
			dp[total] = (dp[total] + dp[total-int(power)]) % mod
		}
	}
	return int(dp[n])
}
