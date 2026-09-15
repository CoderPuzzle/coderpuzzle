func countGoodSubstrings(s string) int {
	// A length-3 window is good iff its three characters are pairwise
	// distinct; slide the center and count.
	count := 0
	for i := 1; i+1 < len(s); i++ {
		if s[i-1] != s[i] && s[i] != s[i+1] && s[i-1] != s[i+1] {
			count++
		}
	}
	return count
}
