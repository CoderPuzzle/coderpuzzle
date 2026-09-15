func maxScore(cardPoints []int, k int) int {
	n := len(cardPoints)
	total := 0
	for _, value := range cardPoints {
		total += value
	}
	// taking k cards off the ends always leaves a contiguous middle block
	// of length n-k, so max score = total - min sum of a length n-k window
	window := n - k
	current := 0
	for i := 0; i < window; i++ {
		current += cardPoints[i]
	}
	best := current
	for i := window; i < n; i++ {
		// slide one position: add the entering card, drop the leaving one
		current += cardPoints[i] - cardPoints[i-window]
		if current < best {
			best = current
		}
	}
	return total - best
}
