func distanceBetweenBusStops(distance []int, start int, destination int) int {
	// Order the stops: edge i leads from stop i to stop i+1, so the
	// clockwise arc between them uses exactly the entries in between.
	lo, hi := start, destination
	if lo > hi {
		lo, hi = hi, lo
	}
	var total, clockwise int
	for i, d := range distance {
		total += d
		if i >= lo && i < hi {
			clockwise += d
		}
	}
	if other := total - clockwise; other < clockwise {
		return other
	}
	return clockwise
}
