func longestCommonSubsequence(text1 string, text2 string) int {
	m, n := len(text1), len(text2)
	// dp row for the empty prefix of text1 (all zeros); each new row only
	// reads the row above, so two rows suffice
	prev := make([]int, n+1)
	curr := make([]int, n+1)
	for i := 1; i <= m; i++ {
		c := text1[i-1]
		for j := 1; j <= n; j++ {
			if c == text2[j-1] {
				// aligning matching last chars is always safe: extend the
				// LCS of both shorter prefixes
				curr[j] = prev[j-1] + 1
			} else {
				// an optimal LCS discards at least one of the two
				// characters, so take the better of dropping either
				curr[j] = max(prev[j], curr[j-1])
			}
		}
		// curr becomes the previous row for the next i
		prev, curr = curr, prev
	}
	return prev[n]
}
