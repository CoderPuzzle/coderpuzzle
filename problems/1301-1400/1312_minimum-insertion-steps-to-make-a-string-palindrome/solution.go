func minInsertions(s string) int {
	n := len(s)
	dp := make([][]int, n)
	for i := range dp {
		dp[i] = make([]int, n)
	}
	for length := 2; length <= n; length++ {
		for i := 0; i+length-1 < n; i++ {
			j := i + length - 1
			if s[i] == s[j] {
				if length > 2 {
					dp[i][j] = dp[i+1][j-1]
				} else {
					dp[i][j] = 0
				}
			} else {
				dp[i][j] = 1 + min(dp[i+1][j], dp[i][j-1])
			}
		}
	}
	if n == 0 {
		return 0
	}
	return dp[0][n-1]
}
