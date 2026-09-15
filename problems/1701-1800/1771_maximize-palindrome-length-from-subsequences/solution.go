// dp[i][j] holds the longest palindromic subsequence of s[i..j]; i descends
// and j ascends so both dependencies are ready. Equal ends straddling the
// word boundary mark a palindrome both words contribute to, so the answer is
// the best such dp[i][j] (0 when no boundary pair matches).
func longestPalindrome(word1 string, word2 string) int {
	n1 := len(word1)
	s := word1 + word2
	n := len(s)
	dp := make([][]int16, n+1)
	for i := range dp {
		dp[i] = make([]int16, n+1)
	}
	best := 0
	for i := n - 1; i >= 0; i-- {
		dp[i][i] = 1
		si := s[i]
		for j := i + 1; j < n; j++ {
			if si == s[j] {
				length := dp[i+1][j-1] + 2
				dp[i][j] = length
				// Equal ends straddling the boundary mean both words
				// contribute at least one character of the palindrome.
				if i < n1 && j >= n1 && int(length) > best {
					best = int(length)
				}
			} else if dp[i+1][j] > dp[i][j-1] {
				dp[i][j] = dp[i+1][j]
			} else {
				dp[i][j] = dp[i][j-1]
			}
		}
	}
	return best
}
