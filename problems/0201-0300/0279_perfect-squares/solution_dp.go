func numSquares(n int) int {
	// The squares i*i up to sqrt(n), precomputed once.
	squares := make([]int, 0)
	for i := 1; i*i <= n; i++ {
		squares = append(squares, i*i)
	}
	// dp[i] = fewest perfect squares summing to i: any decomposition ends
	// with some square s <= i, leaving the subproblem dp[i - s], so
	// dp[i] = 1 + min(dp[i - s]). n+1 beats any real count (n ones), so it
	// serves as infinity.
	inf := n + 1
	// dp[0] stays 0: zero squares sum to zero, anchoring the induction.
	dp := make([]int, n+1)
	for i := 1; i <= n; i++ {
		dp[i] = inf
	}
	// Filling i in increasing order means every dp[i - s] consulted is
	// already final.
	for i := 1; i <= n; i++ {
		for _, s := range squares {
			if s > i {
				break
			}
			if dp[i-s]+1 < dp[i] {
				dp[i] = dp[i-s] + 1
			}
		}
	}
	return dp[n]
}
