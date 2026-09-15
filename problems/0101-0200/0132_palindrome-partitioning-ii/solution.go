func minCut(s string) int {
	n := len(s)
	// cut[i] = minimum cuts for the prefix of length i; cut[0] = -1 is a
	// sentinel making a prefix that is itself one palindrome cost 0, and
	// i - 1 is the all-single-characters fallback upper bound.
	cut := make([]int, n+1)
	for i := 0; i <= n; i++ {
		cut[i] = i - 1
	}
	for c := 0; c < n; c++ {
		// Odd-length palindromes expand from (c, c): each still-matching step
		// exposes s[l..r] and relaxes cut[r+1] with cut[l]+1. Left-to-right
		// centers keep every cut[l] read already final.
		for l, r := c, c; l >= 0 && r < n && s[l] == s[r]; l, r = l-1, r+1 {
			if cut[l]+1 < cut[r+1] {
				cut[r+1] = cut[l] + 1
			}
		}
		// Even-length palindromes expand from (c, c+1).
		for l, r := c, c+1; l >= 0 && r < n && s[l] == s[r]; l, r = l-1, r+1 {
			if cut[l]+1 < cut[r+1] {
				cut[r+1] = cut[l] + 1
			}
		}
	}
	return cut[n]
}
