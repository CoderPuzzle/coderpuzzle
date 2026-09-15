func maximumNumberOfStringPairs(words []string) int {
	// A word pairs only with its reversal among earlier words: look up
	// before inserting, so a word can never pair with itself. Distinct
	// strings make each candidate partner unique, so counting every hit
	// is optimal — palindromes can never find an earlier copy at all.
	seen := make(map[string]bool)
	pairs := 0
	for _, word := range words {
		letters := []byte(word)
		for i, j := 0, len(letters)-1; i < j; i, j = i+1, j-1 {
			letters[i], letters[j] = letters[j], letters[i]
		}
		if seen[string(letters)] {
			pairs++
		}
		seen[word] = true
	}
	return pairs
}
