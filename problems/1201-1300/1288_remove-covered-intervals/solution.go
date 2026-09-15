import "sort"

func removeCoveredIntervals(intervals [][]int) int {
	// Sort by start ascending, end DESCENDING: then any interval whose end
	// is not beyond the best end seen so far must sit inside some earlier
	// interval (equal starts sort the wider one first, so the narrower twin
	// is correctly counted as covered).
	sort.Slice(intervals, func(a, b int) bool {
		if intervals[a][0] != intervals[b][0] {
			return intervals[a][0] < intervals[b][0]
		}
		return intervals[b][1] < intervals[a][1]
	})
	remaining := 0
	bestEnd := 0
	for _, interval := range intervals {
		if interval[1] > bestEnd {
			remaining++
			bestEnd = interval[1]
		}
	}
	return remaining
}
