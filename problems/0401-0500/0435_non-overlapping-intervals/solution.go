import (
	"math"
	"sort"
)

func eraseOverlapIntervals(intervals [][]int) int {
	ordered := make([][]int, len(intervals))
	copy(ordered, intervals)
	sort.Slice(ordered, func(i, j int) bool { return ordered[i][1] < ordered[j][1] })
	// Minimizing removals = maximizing kept non-overlapping intervals, so
	// sweep by earliest end: keeping the earliest-ending candidate leaves the
	// most room for everything after it.
	removed := 0
	// Sentinel below any real endpoint (endpoints may be negative).
	prevEnd := int64(math.MinInt64)
	for _, iv := range ordered {
		// Touching endpoints do not overlap, so start == prevEnd keeps.
		if int64(iv[0]) >= prevEnd {
			prevEnd = int64(iv[1])
		} else {
			// Discarded: it intersects the last kept (earliest-ending)
			// interval, so one removal per conflict is exactly optimal.
			removed++
		}
	}
	return removed
}
