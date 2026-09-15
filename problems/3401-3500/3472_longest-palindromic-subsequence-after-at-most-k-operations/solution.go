func longestPalindromicSubsequence(s string, k int) int {
	n := len(s)
	// dp[i][j][c] = longest palindromic subsequence of s[i..j] using at most c
	// operations.
	dp := make([][][]int, n)
	for i := range dp {
		dp[i] = make([][]int, n)
		for j := range dp[i] {
			dp[i][j] = make([]int, k+1)
		}
	}
	for i := 0; i < n; i++ {
		for c := 0; c <= k; c++ {
			dp[i][i][c] = 1
		}
	}
	for length := 2; length <= n; length++ {
		for i := 0; i+length-1 < n; i++ {
			j := i + length - 1
			for c := 0; c <= k; c++ {
				best := dp[i+1][j][c]
				if dp[i][j-1][c] > best {
					best = dp[i][j-1][c]
				}
				d := int(s[i]) - int(s[j])
				if d < 0 {
					d = -d
				}
				if 26-d < d {
					d = 26 - d
				}
				if d <= c {
					val := dp[i+1][j-1][c-d] + 2
					if val > best {
						best = val
					}
				}
				dp[i][j][c] = best
			}
		}
	}
	return dp[0][n-1][k]
}
