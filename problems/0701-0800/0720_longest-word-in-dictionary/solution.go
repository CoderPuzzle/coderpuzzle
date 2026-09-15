import "sort"

func longestWord(words []string) string {
	// Sorted order visits every word after the word minus its last
	// character, so one sweep can grow the buildable set incrementally.
	sort.Strings(words)
	best := ""
	buildable := make(map[string]bool)
	for _, word := range words {
		// Buildable by the statement's rule: the word minus its last
		// character is already buildable, and a lone letter carries the
		// empty prefix, so it needs nothing.
		if len(word) == 1 || buildable[word[:len(word)-1]] {
			buildable[word] = true
			// Strictly longer only: among equal lengths the first word
			// in sorted order — the lexicographically smallest — wins.
			if len(word) > len(best) {
				best = word
			}
		}
	}
	// Nothing buildable at all: the statement's empty-string answer.
	return best
}
