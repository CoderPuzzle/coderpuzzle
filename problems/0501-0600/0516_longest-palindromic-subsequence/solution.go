func longestPalindromeSubseq(s string) int {
	n := len(s)
	if n == 0 {
		return 0
	}
	dp := make([][]int, n)
	for i := range dp {
		dp[i] = make([]int, n)
	}
	// dp[i][j] = longest palindromic subsequence inside s[i..j]. Filling
	// i descending and j ascending finalizes the three dependencies (drop
	// left end, drop right end, drop both) before each write.
	for i := n - 1; i >= 0; i-- {
		dp[i][i] = 1
		for j := i + 1; j < n; j++ {
			if s[i] == s[j] {
				// Matching ends wrap the best inner palindrome; the
				// zero-filled table yields 0 for an empty inner interval.
				dp[i][j] = dp[i+1][j-1] + 2
			} else {
				// At least one end is absent from an optimal answer.
				if dp[i+1][j] >= dp[i][j-1] {
					dp[i][j] = dp[i+1][j]
				} else {
					dp[i][j] = dp[i][j-1]
				}
			}
		}
	}
	return dp[0][n-1]
}
