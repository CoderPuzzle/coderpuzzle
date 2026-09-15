func distributeCandies(n int, limit int) int {
	// Fix the first child's share, then the other two just need b + c
	// = rest with both halves capped: the valid b values form the
	// consecutive range [max(0, rest - limit), min(limit, rest)]. The
	// count never exceeds C(52, 2) = 1326, well inside int range.
	total := 0
	upper := n
	if limit < n {
		upper = limit
	}
	for first := 0; first <= upper; first++ {
		rest := n - first
		low := rest - limit
		if low < 0 {
			low = 0
		}
		high := limit
		if rest < high {
			high = rest
		}
		if high >= low {
			total += high - low + 1
		}
	}
	return total
}
