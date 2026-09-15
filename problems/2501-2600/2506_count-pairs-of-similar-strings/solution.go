func similarPairs(words []string) int {
	// Similarity ignores multiplicity and order: a 26-bit signature with one
	// bit per letter identifies each character set, and counting earlier
	// occurrences of the running signature adds every eligible pair on the
	// fly.
	counts := make(map[int]int)
	total := 0
	for _, word := range words {
		signature := 0
		for _, ch := range word {
			signature |= 1 << (ch - 'a')
		}
		total += counts[signature]
		counts[signature]++
	}
	return total
}
