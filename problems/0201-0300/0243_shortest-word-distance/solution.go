// One pass remembering the most recent position of each word. The statement
// guarantees word1 != word2, so no element is ever both.
func shortestDistance(wordsDict []string, word1 string, word2 string) int {
	index1 := -1
	index2 := -1
	// The two words sit at distinct indices, so no real gap reaches the
	// length of the list — it is a safe unreachable starting bound.
	best := len(wordsDict)
	for index, word := range wordsDict {
		if word == word1 {
			index1 = index
		} else if word == word2 {
			index2 = index
		}
		if index1 >= 0 && index2 >= 0 {
			// A fresh occurrence is closest to the latest opposite occurrence
			// behind it; older ones lie farther back, so this single gap is
			// the only candidate the new occurrence adds.
			gap := index1 - index2
			if gap < 0 {
				gap = -gap
			}
			if gap < best {
				best = gap
			}
		}
	}
	return best
}
