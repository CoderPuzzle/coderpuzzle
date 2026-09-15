func numWays(steps int, arrLen int) int {
	const MOD = 1000000007
	// each move shifts the position by at most one, so only the window
	// min(arrLen, steps+1) is reachable — cost is independent of a
	// huge arrLen
	n := arrLen
	if steps+1 < n {
		n = steps + 1
	}
	// dp[i] = number of ways to stand at position i after the moves
	// processed so far
	dp := make([]int, n)
	ndp := make([]int, n)
	dp[0] = 1
	for s := 0; s < steps; s++ {
		for i := 0; i < n; i++ {
			// stay, or arrive from the left/right neighbor — both
			// guarded by the window bounds
			total := dp[i]
			if i > 0 {
				total += dp[i-1]
			}
			if i+1 < n {
				total += dp[i+1]
			}
			ndp[i] = total % MOD
		}
		dp, ndp = ndp, dp
	}
	// walks that return to the origin after exactly `steps` moves
	return dp[0]
}
