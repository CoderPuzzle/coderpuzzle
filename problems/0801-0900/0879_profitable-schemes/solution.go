func profitableSchemes(n int, minProfit int, group []int, profit []int) int {
	const MOD = 1000000007
	// dp[members][cap] = number of subsets using at most `members` members and
	// at least `cap` profit; cap is capped at minProfit.
	dp := make([][]int64, n+1)
	for members := range dp {
		dp[members] = make([]int64, minProfit+1)
		dp[members][0] = 1
	}
	for idx := range group {
		g, p := group[idx], profit[idx]
		for members := n; members >= g; members-- {
			for cap := minProfit; cap >= 0; cap-- {
				prev := cap - p
				if prev < 0 {
					prev = 0
				}
				dp[members][cap] = (dp[members][cap] + dp[members-g][prev]) % MOD
			}
		}
	}
	return int(dp[n][minProfit])
}
