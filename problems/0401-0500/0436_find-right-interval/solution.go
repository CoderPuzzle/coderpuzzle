import "sort"

// The right interval question is a lower-bound query: pair each start with
// its index, sort by start, and the answer for an end is the first pair whose
// start reaches it.
func findRightInterval(intervals [][]int) []int {
	order := make([]int, len(intervals))
	for i := range order {
		order[i] = i
	}
	sort.Slice(order, func(a, b int) bool { return intervals[order[a]][0] < intervals[order[b]][0] })
	starts := make([]int, len(order))
	for slot, i := range order {
		starts[slot] = intervals[i][0]
	}
	result := make([]int, 0, len(intervals))
	for _, interval := range intervals {
		end := interval[1]
		// Smallest slot whose start is >= end; len(starts) if none. The kept
		// half always contains that boundary, so the window halves until only
		// the boundary is left.
		lo, hi := 0, len(starts)
		for lo < hi {
			mid := (lo + hi) / 2
			if starts[mid] < end {
				lo = mid + 1
			} else {
				hi = mid
			}
		}
		// i may equal j: an end its own start already reaches finds the
		// interval itself; off the end means no start qualifies.
		if lo < len(starts) {
			result = append(result, order[lo])
		} else {
			result = append(result, -1)
		}
	}
	return result
}
