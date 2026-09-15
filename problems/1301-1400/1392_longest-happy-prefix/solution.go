func longestPrefix(s string) string {
	n := len(s)
	// KMP prefix function: pi[i] = length of the longest proper prefix
	// of s[0..i] that is also its suffix; j is the current match length
	pi := make([]int, n)
	j := 0
	for i := 1; i < n; i++ {
		// mismatch: fall back to the border of the matched block — the
		// next-longest candidate; j rises <= 1 per step, so the pass is O(n)
		for j > 0 && s[i] != s[j] {
			j = pi[j-1]
		}
		if s[i] == s[j] {
			j++
		}
		pi[i] = j
	}
	if n == 0 {
		return ""
	}
	// pi[n-1] is a proper border, so it never equals the whole string
	return s[:pi[n-1]]
}
