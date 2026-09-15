func paintWalls(cost []int, time []int) int {
	n := len(cost)
	const INF = int64(1) << 62
	// Paying for wall i covers time[i] + 1 walls — itself plus time[i] the
	// free painter paints meanwhile — so a paid set succeeds iff its weights
	// sum to >= n. dp[j]: cheapest selection covering at least j walls'
	// worth of demand.
	dp := make([]int64, n+1)
	for j := range dp {
		dp[j] = INF
	}
	dp[0] = 0
	for i := 0; i < n; i++ {
		weight := time[i] + 1
		c := int64(cost[i])
		// Descending j keeps each wall used at most once (0/1 knapsack);
		// the clamp folds surplus coverage back to the dp[0] origin, sound
		// because coverage beyond n is worthless.
		for j := n; j >= 1; j-- {
			src := 0
			if j >= weight {
				src = j - weight
			}
			cand := dp[src] + c
			if cand < dp[j] {
				dp[j] = cand
			}
		}
	}
	return int(dp[n])
}
