func isAcronym(words []string, s string) bool {
	// Collect the first character of every word, assemble them into one
	// string in order, and compare the assembled acronym with s. Go's
	// string equality fails on a length difference just as it does on any
	// differing byte.
	letters := make([]byte, 0, len(words))
	for _, word := range words {
		letters = append(letters, word[0])
	}
	return string(letters) == s
}
