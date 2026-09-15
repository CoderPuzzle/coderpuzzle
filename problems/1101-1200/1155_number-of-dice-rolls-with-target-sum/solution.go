func numRollsToTarget(n int, k int, target int) int {
	const MOD = 1000000007
	// dp[t]: ways for the dice processed so far to show sum t
	dp := make([]int, target+1)
	ndp := make([]int, target+1)
	// zero dice reach sum 0 in exactly one way
	dp[0] = 1
	for d := 0; d < n; d++ {
		// fresh table per die: the transition must read only the previous
		// die's distribution, else one die could count twice
		for i := range ndp {
			ndp[i] = 0
		}
		for t := 1; t <= target; t++ {
			s := 0
			// every face value f is a distinct outcome, so all faces are
			// summed; hi = min(k, t) skips faces that overshoot the target
			hi := k
			if t < hi {
				hi = t
			}
			for f := 1; f <= hi; f++ {
				s += dp[t-f]
			}
			ndp[t] = s % MOD
		}
		dp, ndp = ndp, dp
	}
	// targets no die sequence reaches were never written, so read as 0
	return dp[target]
}
