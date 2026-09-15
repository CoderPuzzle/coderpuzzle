// 2D dynamic programming over prefixes: dp[i][j] records whether the first i
// letters of s1 and the first j letters of s2 can interleave into the first
// i + j letters of s3.
func isInterleave(s1 string, s2 string, s3 string) bool {
	// No interleaving can add or drop letters, so settle the length first.
	m, n := len(s1), len(s2)
	if m+n != len(s3) {
		return false
	}
	dp := make([][]bool, m+1)
	for i := range dp {
		dp[i] = make([]bool, n+1)
	}
	dp[0][0] = true
	for i := 1; i <= m; i++ {
		dp[i][0] = dp[i-1][0] && s1[i-1] == s3[i-1]
	}
	for j := 1; j <= n; j++ {
		dp[0][j] = dp[0][j-1] && s2[j-1] == s3[j-1]
	}
	for i := 1; i <= m; i++ {
		for j := 1; j <= n; j++ {
			// The prefix's last letter came from one of the two strings:
			// keep whichever source still has a living reach.
			dp[i][j] = (dp[i-1][j] && s1[i-1] == s3[i+j-1]) ||
				(dp[i][j-1] && s2[j-1] == s3[i+j-1])
		}
	}
	return dp[m][n]
}
