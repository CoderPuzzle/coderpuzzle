func maxDistance(words []string) int {
	// Starting best at 0 bakes in the sentinel: only a genuinely unequal
	// pair can raise it, so an all-equal array (or a single word, which
	// has no pairs at all) returns 0 untouched.
	best := 0
	n := len(words)
	// Check every index pair once; each unequal pair contributes
	// j - i + 1, counting both endpoints.
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if words[i] != words[j] && j-i+1 > best {
				best = j - i + 1
			}
		}
	}
	return best
}
