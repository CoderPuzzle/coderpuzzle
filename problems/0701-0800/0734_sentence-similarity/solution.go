func areSentencesSimilar(sentence1 []string, sentence2 []string, similarPairs [][]string) bool {
	// Different lengths can never be similar.
	if len(sentence1) != len(sentence2) {
		return false
	}

	// Words are bare English letters, so "|" cannot occur inside one:
	// joining with it is a collision-free key for the ordered pair. Both
	// orientations enter the set — the relation is symmetric — so one
	// lookup answers "was this pair declared?".
	declared := make(map[string]bool)
	for _, pair := range similarPairs {
		declared[pair[0]+"|"+pair[1]] = true
		declared[pair[1]+"|"+pair[0]] = true
	}

	for i := range sentence1 {
		a := sentence1[i]
		b := sentence2[i]
		// A word is always similar to itself; anything else must be a
		// declared pair. Nothing chains: big~large and large~huge never
		// make big~huge.
		if a != b && !declared[a+"|"+b] {
			return false
		}
	}
	return true
}
