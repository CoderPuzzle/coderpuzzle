func numEquivDominoPairs(dominoes [][]int) int {
	// Canonical orientation (min, max) collapses a domino and its rotation
	// to one cell of a 9x9 table.
	var table [10][10]int
	pairs := 0
	for _, domino := range dominoes {
		lo, hi := domino[0], domino[1]
		if lo > hi {
			lo, hi = hi, lo
		}
		// Every earlier domino in this cell pairs with the current one.
		pairs += table[lo][hi]
		table[lo][hi]++
	}
	return pairs
}
