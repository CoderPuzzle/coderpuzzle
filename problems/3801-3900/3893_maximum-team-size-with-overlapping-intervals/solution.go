import "sort"

// A team is valid when one member overlaps everyone else, so the largest team
// is the largest set of intervals all overlapping a single interval. For each
// interval i that is exactly the intervals j with
// startTime[j] <= endTime[i] and endTime[j] >= startTime[i].
func maximumTeamSize(startTime []int, endTime []int) int {
	n := len(startTime)
	starts := make([]int, n)
	ends := make([]int, n)
	copy(starts, startTime)
	copy(ends, endTime)
	sort.Ints(starts)
	sort.Ints(ends)
	best := 0
	for i := 0; i < n; i++ {
		// Count starts no later than end minus ends earlier than start; the
		// second set is a subset of the first, so the difference is exactly
		// the overlapping intervals, including i itself.
		startsLE := sort.Search(n, func(j int) bool { return starts[j] > endTime[i] })
		endsLT := sort.Search(n, func(j int) bool { return ends[j] >= startTime[i] })
		overlap := startsLE - endsLT
		if overlap > best {
			best = overlap
		}
	}
	return best
}
