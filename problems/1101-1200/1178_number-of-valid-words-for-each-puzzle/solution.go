func findNumOfValidWords(words []string, puzzles []string) []int {
	counts := make(map[int]int)
	// bucket words by their distinct-letter mask (repeats are irrelevant)
	// so each puzzle avoids scanning all words
	for _, w := range words {
		m := 0
		for t := 0; t < len(w); t++ {
			m |= 1 << (w[t] - 'a')
		}
		counts[m]++
	}

	answer := []int{}
	for _, puzzle := range puzzles {
		// a valid word mask must contain the puzzle's first letter
		first := 1 << (puzzle[0] - 'a')
		puzzleMask := 0
		for t := 0; t < len(puzzle); t++ {
			puzzleMask |= 1 << (puzzle[t] - 'a')
		}
		total := 0
		// enumerate every submask of the 7-letter puzzle mask (at most 127);
		// sub = (sub - 1) & puzzleMask walks them all in order
		sub := puzzleMask
		for sub != 0 {
			if sub&first != 0 {
				total += counts[sub]
			}
			sub = (sub - 1) & puzzleMask
		}
		answer = append(answer, total)
	}
	return answer
}
