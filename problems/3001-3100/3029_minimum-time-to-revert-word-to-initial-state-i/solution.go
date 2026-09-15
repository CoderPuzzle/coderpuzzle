func minimumTimeToInitialState(word string, k int) int {
	// After t seconds exactly t*k original characters have been removed
	// from the front; additions only ever land behind the survivors. The
	// word reverts iff nothing survives (t*k >= n) or the surviving suffix
	// word[t*k:] equals the prefix it would occupy.
	n := len(word)
	t := 1
	for t*k < n && word[:n-t*k] != word[t*k:] {
		t++
	}
	return t
}
