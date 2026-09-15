func numWays(words []string, target string) int {
	const MOD = 1000000007
	width := len(words[0])
	n := len(target)
	// Fewer columns than target characters: no strictly increasing
	// sequence of that length exists.
	if n > width {
		return 0
	}

	// charCount[k][c]: how many rows have letter c at column k.
	charCount := make([][26]int, width)
	for _, word := range words {
		for k := 0; k < width; k++ {
			charCount[k][word[k]-'a']++
		}
	}

	// dp[i]: ways to have placed the first i target characters using the
	// columns considered so far. Rolled forward one column at a time.
	dp := make([]int64, n+1)
	dp[0] = 1
	for k := 0; k < width; k++ {
		// Walk i downward so dp[i-1] still reflects the previous column's
		// value when it feeds dp[i] this round -- the usual
		// rolling-knapsack update order.
		for i := n; i >= 1; i-- {
			need := target[i-1] - 'a'
			dp[i] = (dp[i] + dp[i-1]*int64(charCount[k][need])) % MOD
		}
	}
	return int(dp[n])
}
