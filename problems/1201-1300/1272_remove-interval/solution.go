func removeInterval(intervals [][]int, toBeRemoved []int) [][]int {
	// Per interval, three outcomes: disjoint from the removal (keep whole),
	// straddling the left edge (keep head), or straddling the right edge
	// (keep tail); a full cover keeps nothing. An interval can only ever
	// be cut into two pieces, never more.
	removeStart, removeEnd := toBeRemoved[0], toBeRemoved[1]
	kept := [][]int{}
	for _, interval := range intervals {
		start, end := interval[0], interval[1]
		if start >= removeEnd || end <= removeStart {
			kept = append(kept, interval)
			continue
		}
		if start < removeStart {
			kept = append(kept, []int{start, removeStart})
		}
		if end > removeEnd {
			kept = append(kept, []int{removeEnd, end})
		}
	}
	return kept
}
