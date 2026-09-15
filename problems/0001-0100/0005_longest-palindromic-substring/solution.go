func longestPalindrome(s string) string {
	n := len(s)
	// Walk outward from a center while the two boundary characters match;
	// each expansion step is a single comparison.
	expand := func(left, right int) (int, int) {
		for left >= 0 && right < n && s[left] == s[right] {
			left--
			right++
		}
		// Overshot by one on each side: back up to the widest palindrome.
		return left + 1, right - 1
	}
	// (0, 0) makes a single character the initial answer, so the
	// returned substring is never empty.
	bestStart, bestEnd := 0, 0
	for i := 0; i < n; i++ {
		// Try both center kinds: (i, i) for odd lengths, (i, i+1) for even
		// ones; at the last gap the even case fails immediately.
		centers := [2][2]int{{0, 0}, {0, 0}}
		l, r := expand(i, i)
		centers[0] = [2]int{l, r}
		l, r = expand(i, i+1)
		centers[1] = [2]int{l, r}
		for _, c := range centers {
			// Strict > keeps an earlier palindrome on ties, so the
			// leftmost longest one wins ("babad" -> "bab", not "aba").
			if c[1]-c[0] > bestEnd-bestStart {
				bestStart, bestEnd = c[0], c[1]
			}
		}
	}
	return s[bestStart : bestEnd+1]
}
