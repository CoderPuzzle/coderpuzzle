// The walk has three phases: pass through every interval that ends before
// the new one starts, absorb the contiguous run that shares a point with it
// by widening it, then pass through the rest.
func insert(intervals [][]int, newInterval []int) [][]int {
	merged := make([][]int, 0, len(intervals)+1)
	// The new interval is widened in start/end locals so the caller's
	// newInterval is never mutated while it is being absorbed.
	start, end := newInterval[0], newInterval[1]
	i := 0
	// Phase 1 — an interval ending strictly before the new one starts
	// shares no point with it, so every such interval passes through
	// untouched and in order.
	for i < len(intervals) && intervals[i][1] < start {
		merged = append(merged, intervals[i])
		i++
	}
	// Phase 2 — an interval starting at or before the new end shares at
	// least one point, so it is absorbed by widening [start, end] to
	// cover it. The absorbed intervals are contiguous because the input
	// is sorted by start, so one widening run merges everything.
	for i < len(intervals) && intervals[i][0] <= end {
		if intervals[i][0] < start {
			start = intervals[i][0]
		}
		if intervals[i][1] > end {
			end = intervals[i][1]
		}
		i++
	}
	merged = append(merged, []int{start, end})
	// Phase 3 — whatever is left starts strictly after the new end, so
	// it shares no point with the merged interval either and passes
	// through untouched.
	for i < len(intervals) {
		merged = append(merged, intervals[i])
		i++
	}
	return merged
}
