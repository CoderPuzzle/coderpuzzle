func shortestPalindrome(s string) string {
	revBytes := []byte(s)
	for i, j := 0, len(revBytes)-1; i < j; i, j = i+1, j-1 {
		revBytes[i], revBytes[j] = revBytes[j], revBytes[i]
	}
	rev := string(revBytes)
	// A prefix of s is a palindrome exactly when it equals a suffix of rev,
	// so the KMP prefix function over s + "#" + rev finds it. The separator
	// character (absent from s) keeps the border from stretching across the
	// join and exceeding len(s).
	combined := s + "#" + rev
	n := len(combined)
	lps := make([]int, n)
	for i := 1; i < n; i++ {
		// j is the border length of the previous position: shrink through
		// lps[j-1] on mismatch, extend by one on match — linear overall.
		j := lps[i-1]
		for j > 0 && combined[i] != combined[j] {
			j = lps[j-1]
		}
		if combined[i] == combined[j] {
			j++
		}
		lps[i] = j
	}
	// The last entry is the longest proper border: the palindromic prefix
	// length.
	palLen := 0
	if n > 0 {
		palLen = lps[n-1]
	}
	// Mirror only the non-palindromic tail onto the front.
	return rev[:len(s)-palLen] + s
}
