// One pass remembering the most recent position of each word. Here word1 and
// word2 may be the same word, and that case is the twist.
func shortestWordDistance(wordsDict []string, word1 string, word2 string) int {
	same := word1 == word2
	index1 := -1
	index2 := -1
	// The two queried words occupy two distinct indices, so no real gap
	// reaches the length of the list — it is a safe unreachable bound.
	best := len(wordsDict)
	for index, word := range wordsDict {
		if word == word1 {
			if same {
				// Equal words: the previous occurrence now plays the
				// counterpart, so only gaps between consecutive occurrences
				// of the one word are ever compared.
				index2 = index1
			}
			index1 = index
		} else if word == word2 {
			index2 = index
		}
		if index1 >= 0 && index2 >= 0 {
			// A fresh occurrence is closest to the latest occurrence behind
			// it; older ones lie farther back, so this single gap is the
			// only candidate the new occurrence adds.
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
