func findMaxForm(strs []string, m int, n int) int {
	// dp[i][j] = most strings pickable with at most i zeros and j ones: a
	// 0/1 knapsack with two resource axes; the all-zero table already
	// encodes "pick nothing".
	dp := make([][]int, m+1)
	for i := range dp {
		dp[i] = make([]int, n+1)
	}
	for _, s := range strs {
		// Only the string's shape matters: its 0-count and 1-count.
		zeros := 0
		for k := 0; k < len(s); k++ {
			if s[k] == '0' {
				zeros++
			}
		}
		ones := len(s) - zeros
		// Budgets iterate downward so every read sees values from before
		// this string's pass — enforcing 0/1 (once-per-string) use.
		// Take-or-skip: taking is optional when it doesn't pay.
		for i := m; i >= zeros; i-- {
			for j := n; j >= ones; j-- {
				if cand := dp[i-zeros][j-ones] + 1; cand > dp[i][j] {
					dp[i][j] = cand
				}
			}
		}
	}
	return dp[m][n]
}
