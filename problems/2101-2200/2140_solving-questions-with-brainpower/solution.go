func mostPoints(questions [][]int) int64 {
	n := len(questions)
	// dp[i] = best score starting at question i; dp[n] = 0 is the sentinel
	// for "nothing left". Fill right to left so every future value is ready
	// before it is read.
	dp := make([]int64, n+1)
	for i := n - 1; i >= 0; i-- {
		points := int64(questions[i][0])
		// nxt is the first question unlocked after the lockout; a jump past
		// the end simply adds nothing.
		nxt := i + questions[i][1] + 1
		take := points
		if nxt <= n {
			take += dp[nxt]
		}
		// Skip keeps dp[i+1]; take solves and jumps.
		if dp[i+1] > take {
			take = dp[i+1]
		}
		dp[i] = take
	}
	return dp[0]
}
