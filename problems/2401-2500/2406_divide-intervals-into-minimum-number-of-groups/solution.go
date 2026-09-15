import "sort"

func minGroups(intervals [][]int) int {
	n := len(intervals)
	starts := make([]int, n)
	ends := make([]int, n)
	for i, interval := range intervals {
		starts[i] = interval[0]
		ends[i] = interval[1]
	}
	sort.Ints(starts)
	sort.Ints(ends)
	// Answer = peak coverage depth: intervals sharing a point pairwise
	// intersect, so they need distinct groups, and peak depth suffices.
	// Only openings can create depth, so stop once starts are used up.
	groups := 0
	active := 0
	i, j := 0, 0
	for i < n {
		// '<=' keeps touching intervals ([1,5],[5,8]) overlapping —
		// the opening at ends[j] is processed before that close.
		if starts[i] <= ends[j] {
			active++
			if active > groups {
				groups = active
			}
			i++
		} else {
			active--
			j++
		}
	}
	return groups
}
