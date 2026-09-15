// dp[i] holds the fewest extra characters left over after breaking the
// prefix s[:i] optimally; dp[0] is the empty prefix.
func minExtraChar(s string, dictionary []string) int {
	n := len(s)
	dp := make([]int, n+1)
	for i := range dp {
		dp[i] = n + 1
	}
	dp[0] = 0
	for i := 0; i < n; i++ {
		// skip move: leave s[i] as an extra character
		if dp[i]+1 < dp[i+1] {
			dp[i+1] = dp[i] + 1
		}
		// match moves: a word starting at i jumps to i + len(word)
		for _, word := range dictionary {
			j := i + len(word)
			if j <= n && s[i:j] == word && dp[i] < dp[j] {
				dp[j] = dp[i]
			}
		}
	}
	return dp[n]
}
