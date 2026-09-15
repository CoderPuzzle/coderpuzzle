func minimumRecolors(blocks string, k int) int {
	// The answer is the window of k consecutive blocks containing the
	// fewest whites; a sliding window updates that count in O(1) as it
	// moves.
	whites := 0
	for i := 0; i < k; i++ {
		if blocks[i] == 'W' {
			whites++
		}
	}
	best := whites
	for right := k; right < len(blocks); right++ {
		entering, leaving := 0, 0
		if blocks[right] == 'W' {
			entering = 1
		}
		if blocks[right-k] == 'W' {
			leaving = 1
		}
		whites += entering - leaving
		if whites < best {
			best = whites
		}
	}
	return best
}
