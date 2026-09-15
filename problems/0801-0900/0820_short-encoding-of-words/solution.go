func minimumLengthEncoding(words []string) int {
	// A word needs no slot of its own when another word ends with
	// it: start from every word, then discard strict suffixes.
	keep := make(map[string]struct{})
	for _, w := range words {
		keep[w] = struct{}{}
	}
	for _, w := range words {
		// Only proper suffixes (k >= 1) are removed, so w itself —
		// and duplicates of it — survive to share a single slot.
		for k := 1; k < len(w); k++ {
			delete(keep, w[k:])
		}
	}
	// Survivors are exactly the words no other word ends with; each
	// pays len + 1 for its terminating '#'.
	total := 0
	for w := range keep {
		total += len(w) + 1
	}
	return total
}
