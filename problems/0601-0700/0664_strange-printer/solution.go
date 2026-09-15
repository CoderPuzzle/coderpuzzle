// dp[i][j] is the fewest turns that print s[i..j]. The stroke that leaves
// s[i] standing either covers i alone, dp[i+1][j] + 1, or runs on to some
// k with s[k] == s[i]: that stroke is shared with the suffix s[k..j] while
// the overprinted gap s[i+1..k-1] is solved on its own, dp[i+1][k-1] +
// dp[k][j].
func strangePrinter(s string) int {
	n := len(s)
	dp := make([][]int, n)
	for i := range dp {
		dp[i] = make([]int, n)
	}
	for i := n - 1; i >= 0; i-- {
		dp[i][i] = 1
		for j := i + 1; j < n; j++ {
			best := dp[i+1][j] + 1
			for k := i + 1; k <= j; k++ {
				if s[k] == s[i] {
					if candidate := dp[i+1][k-1] + dp[k][j]; candidate < best {
						best = candidate
					}
				}
			}
			dp[i][j] = best
		}
	}
	return dp[0][n-1]
}
