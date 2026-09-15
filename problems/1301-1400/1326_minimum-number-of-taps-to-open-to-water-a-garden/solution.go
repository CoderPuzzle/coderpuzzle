import "sort"

func minTaps(n int, ranges []int) int {
	// Each tap becomes the interval [i-r, i+r] clamped to [0, n]; the task
	// is the classic minimum-interval-cover of the garden segment.
	type interval struct{ start, end int }
	intervals := make([]interval, len(ranges))
	for i, r := range ranges {
		start := i - r
		if start < 0 {
			start = 0
		}
		end := i + r
		if end > n {
			end = n
		}
		intervals[i] = interval{start, end}
	}
	// Sorting by left endpoint makes the sweep a single pass.
	sort.Slice(intervals, func(a, b int) bool {
		if intervals[a].start != intervals[b].start {
			return intervals[a].start < intervals[b].start
		}
		return intervals[a].end < intervals[b].end
	})
	count := 0
	covered := 0
	i := 0
	total := len(intervals)
	for covered < n {
		// Among all intervals that start at or before the watered prefix,
		// take the farthest reach — the jump-game argument: any solution
		// must cross the current boundary, and the farthest reach leaves
		// the most room for the remaining cover.
		reach := covered
		for i < total && intervals[i].start <= covered {
			if intervals[i].end > reach {
				reach = intervals[i].end
			}
			// Once an interval's start exceeds `covered` it exceeds every
			// earlier value too, so i is never revisited.
			i++
		}
		if reach == covered {
			// No interval connects to the watered prefix: unwatered gap.
			return -1
		}
		covered = reach
		count++
	}
	return count
}
