func minDistance(word1 string, word2 string) int {
	a, b := word1, word2
	la, lb := len(a), len(b)
	// dp[i][j] = LCS length of the first i chars of a and first j of b; row/col 0 stay 0.
	dp := make([][]int, la+1)
	for i := range dp {
		dp[i] = make([]int, lb+1)
	}
	for i := 1; i <= la; i++ {
		for j := 1; j <= lb; j++ {
			if a[i-1] == b[j-1] {
				// Matching chars extend the diagonal prefix by one.
				dp[i][j] = dp[i-1][j-1] + 1
			} else {
				// Drop the last char of one string and carry the better result forward.
				dp[i][j] = max(dp[i-1][j], dp[i][j-1])
			}
		}
	}
	// Keep the LCS, delete everything else from both words.
	return la + lb - 2*dp[la][lb]
}
