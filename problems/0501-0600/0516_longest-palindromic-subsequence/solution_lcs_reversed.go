func longestPalindromeSubseq(s string) int {
	n := len(s)
	if n == 0 {
		return 0
	}
	// A mirror reads the same both ways, so it survives reversing the
	// string: the answer is the longest common subsequence of s and its
	// reversal. Each row of that table reads only the row above, so two
	// rows carry the whole computation.
	t := make([]byte, n)
	for i := range t {
		t[i] = s[n-1-i]
	}
	prev := make([]int, n+1)
	for i := 1; i <= n; i++ {
		curr := make([]int, n+1)
		for j := 1; j <= n; j++ {
			if s[i-1] == t[j-1] {
				// Agreeing first letters open a common subsequence
				// built from the two remainders.
				curr[j] = prev[j-1] + 1
			} else {
				// At least one of the two first letters is absent from
				// an optimal common subsequence.
				if prev[j] >= curr[j-1] {
					curr[j] = prev[j]
				} else {
					curr[j] = curr[j-1]
				}
			}
		}
		prev = curr
	}
	return prev[n]
}
