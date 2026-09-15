func prefixConnected(words []string, k int) int {
	// Sharing the first k characters is transitive, so each connected
	// group is exactly one k-prefix and counting groups of size >= 2
	// is counting prefixes that occur at least twice.
	counts := make(map[string]int)
	for _, word := range words {
		if len(word) >= k {
			counts[word[:k]]++
		}
	}
	// A group needs at least two words, so prefixes seen once do not
	// count; the answer is at most n <= 5000, exact in an int.
	groups := 0
	for _, c := range counts {
		if c >= 2 {
			groups++
		}
	}
	return groups
}
