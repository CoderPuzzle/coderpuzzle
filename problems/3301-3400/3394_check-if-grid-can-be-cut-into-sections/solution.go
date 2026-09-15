import "sort"

func checkValidCuts(n int, rectangles [][]int) bool {
	return hasTwoGaps(rectangles, 0) || hasTwoGaps(rectangles, 1)
}

func hasTwoGaps(rectangles [][]int, axis int) bool {
	// Two cuts split the rectangles along one axis exactly when that
	// axis's [start, end] projections fall into three or more groups.
	// Sweep the sorted projections once with a running furthest end:
	// each next start at or beyond it is a gap where a cut can pass
	// (touching edges included), and two such gaps make three groups.
	type interval struct{ start, end int }
	intervals := make([]interval, len(rectangles))
	for i, r := range rectangles {
		intervals[i] = interval{start: r[axis], end: r[axis+2]}
	}
	sort.Slice(intervals, func(i, j int) bool {
		return intervals[i].start < intervals[j].start
	})
	gaps := 0
	reach := intervals[0].end
	for _, in := range intervals[1:] {
		if in.start >= reach {
			gaps++
			if gaps == 2 {
				return true
			}
		}
		if in.end > reach {
			reach = in.end
		}
	}
	return false
}
