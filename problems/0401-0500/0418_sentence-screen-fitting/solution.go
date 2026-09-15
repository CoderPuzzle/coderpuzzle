// One sentence "packet": every word plus its trailing space.
func wordsTyping(sentence []string, rows int, cols int) int {
	n := len(sentence)
	lengths := make([]int, n)
	packet := n
	for i, word := range sentence {
		lengths[i] = len(word)
		packet += lengths[i]
	}
	nextStart := make([]int, n)
	rowWords := make([]int, n)
	for i := range nextStart {
		nextStart[i] = -1
	}
	total := 0
	start := 0
	for row := 0; row < rows; row++ {
		if nextStart[start] < 0 {
			// A row's fill depends only on the word it starts from, so
			// memoize (next start, words placed) per start index.
			used, placed, j := 0, 0, start
			// Finish the in-progress sentence pass, reaching word 0.
			for j < n && used+lengths[j] <= cols {
				used += lengths[j] + 1
				placed++
				j++
			}
			if j == n {
				j = 0
				if used <= cols {
					// Aligned at word 0: whole packets fit wholesale,
					// (cols - used) / packet of them, in one step.
					full := (cols - used) / packet
					placed += full * n
					used += full * packet
				}
				// A sub-packet remainder: fewer than `packet` columns
				// left, so at most n more words, one by one.
				for j < n && used+lengths[j] <= cols {
					used += lengths[j] + 1
					placed++
					j++
				}
				if j == n {
					j = 0
				}
			}
			nextStart[start] = j
			rowWords[start] = placed
		}
		total += rowWords[start]
		start = nextStart[start]
	}
	// Every n consecutive words placed completes the sentence once.
	return total / n
}
