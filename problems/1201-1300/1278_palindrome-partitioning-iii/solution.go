func palindromePartition(s string, k int) int {
	n := len(s)
	// cost[i][j] = min changes to make s[i..j] a palindrome
	cost := make([][]int, n)
	for i := range cost {
		cost[i] = make([]int, n)
	}
	for length := 2; length <= n; length++ {
		for i := 0; i+length <= n; i++ {
			j := i + length - 1
			mismatch := 0
			if s[i] != s[j] {
				mismatch = 1
			}
			// each mismatched outer pair costs one change; the
			// interior cost is already known (lengths grow)
			cost[i][j] = cost[i+1][j-1] + mismatch
		}
	}
	// dp[c][i] = min changes to split prefix of length i into c parts
	inf := n/2 + 1 // any interval costs at most n / 2
	dp := make([][]int, k+1)
	for c := range dp {
		dp[c] = make([]int, n+1)
		for i := range dp[c] {
			dp[c][i] = inf
		}
	}
	for i := 1; i <= n; i++ {
		dp[1][i] = cost[0][i-1]
	}
	for c := 2; c <= k; c++ {
		// i starts at c: c non-empty parts need at least c characters
		for i := c; i <= n; i++ {
			best := inf
			// the last part is s[j..i-1] — try every left boundary
			for j := c - 1; j < i; j++ {
				if cand := dp[c-1][j] + cost[j][i-1]; cand < best {
					best = cand
				}
			}
			dp[c][i] = best
		}
	}
	return dp[k][n]
}
