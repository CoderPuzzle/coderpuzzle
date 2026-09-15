func countSubstrings(s string) int {
	n := len(s)
	count := 0
	// Every successful step of an expansion is one more palindrome; it stops
	// at the first mismatch since wrapping can never restore symmetry.
	expand := func(left, right int) int {
		c := 0
		for left >= 0 && right < n && s[left] == s[right] {
			c++
			left--
			right++
		}
		return c
	}
	for center := 0; center < n; center++ {
		// Each palindrome has one center: a character (odd) or a gap (even),
		// so trying both shapes discovers every occurrence exactly once.
		count += expand(center, center)
		count += expand(center, center+1)
	}
	return count
}
