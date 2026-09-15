func captureForts(forts []int) int {
	// A move is only possible between two non-zero entries separated by
	// enemy forts, and it captures when the two ends differ (your fort
	// 1 -> empty -1 in either direction). One scan remembers the
	// previous non-zero position; every new non-zero closes the stretch
	// of zeros since then, so the best differing gap seen is exactly the
	// most enemy forts capturable.
	best := 0
	last := -1
	for i, value := range forts {
		if value == 0 {
			continue
		}
		if last >= 0 && value != forts[last] {
			best = max(best, i-last-1)
		}
		last = i
	}
	return best
}
