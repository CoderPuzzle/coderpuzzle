func minimumOperationsToMakeKPeriodic(word string, k int) int {
	// An operation copies one existing k-block over another, so the set of
	// block contents only shrinks and every block must end up equal to some
	// original block. Keeping the most frequent one untouched, each of the
	// other blocks is fixed by a single copy.
	counts := make(map[string]int)
	blocks := len(word) / k
	best := 0
	for i := 0; i < len(word); i += k {
		block := word[i : i+k]
		counts[block]++
		if counts[block] > best {
			best = counts[block]
		}
	}
	return blocks - best
}
