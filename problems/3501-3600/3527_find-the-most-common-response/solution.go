func findCommonResponse(responses [][]string) string {
	// Deduplicate within each day first — a response repeated in the same
	// day still counts once — then tally the deduped words across days in
	// a hash map and keep the best (count, lexicographic order) seen.
	counts := make(map[string]int)
	for _, day := range responses {
		unique := make(map[string]bool)
		for _, word := range day {
			unique[word] = true
		}
		for word := range unique {
			counts[word]++
		}
	}
	bestWord := ""
	bestCount := 0
	for word, count := range counts {
		if count > bestCount || (count == bestCount && word < bestWord) {
			bestWord = word
			bestCount = count
		}
	}
	return bestWord
}
