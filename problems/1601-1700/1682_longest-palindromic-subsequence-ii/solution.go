// Interval DP keyed by the outermost pair's letter: dp[l][r][c] is the
// longest good palindromic subsequence inside s[l..r] whose first and last
// characters are both c; nesting a pair around an inner one requires the
// two letters to differ.
func longestPalindromeSubseq(s string) int {
	n := len(s)
	dp := make([][][]int, n)
	for l := range dp {
		dp[l] = make([][]int, n)
		for r := range dp[l] {
			dp[l][r] = make([]int, 26)
		}
	}
	for l := n - 2; l >= 0; l-- {
		for r := l + 1; r < n; r++ {
			cur := dp[l][r]
			for c := 0; c < 26; c++ {
				cur[c] = max(dp[l][r-1][c], dp[l+1][r][c])
			}
			if s[l] == s[r] {
				c0 := int(s[l] - 'a')
				inner := dp[l+1][r-1]
				// Best inner length avoiding the outer letter: the row
				// maximum when it peaks elsewhere, the best of the other
				// 25 letters when the row peaks exactly at c0.
				best1, best2, arg1 := -1, -1, 0
				for c := 0; c < 26; c++ {
					v := inner[c]
					if v > best1 {
						best2, best1, arg1 = best1, v, c
					} else if v > best2 {
						best2 = v
					}
				}
				best := best1
				if arg1 == c0 {
					best = best2
				}
				if 2+best > cur[c0] {
					cur[c0] = 2 + best
				}
			}
		}
	}
	answer := 0
	for _, v := range dp[0][n-1] {
		answer = max(answer, v)
	}
	return answer
}
