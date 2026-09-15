import "sort"

func merge(intervals [][]int) [][]int {
	// Copy, then sort by start (end as tiebreaker): any interval
	// overlapping an earlier one must overlap or touch the most recent
	// merged interval, so a sweep tracking only the last merged
	// interval suffices. Sorting the copy leaves the input untouched.
	ordered := make([][]int, len(intervals))
	copy(ordered, intervals)
	sort.Slice(ordered, func(i, j int) bool {
		if ordered[i][0] != ordered[j][0] {
			return ordered[i][0] < ordered[j][0]
		}
		return ordered[i][1] < ordered[j][1]
	})
	merged := [][]int{}
	for _, interval := range ordered {
		start, end := interval[0], interval[1]
		// `<=` counts touching intervals as overlapping, as required.
		// The start is already covered, so only the right edge matters.
		if n := len(merged); n > 0 && start <= merged[n-1][1] {
			// Raise the right edge when larger; an interval fully
			// swallowed by the merge leaves it untouched.
			if end > merged[n-1][1] {
				merged[n-1][1] = end
			}
		} else {
			// No overlap with the last merged interval: new group.
			merged = append(merged, []int{start, end})
		}
	}
	return merged
}
