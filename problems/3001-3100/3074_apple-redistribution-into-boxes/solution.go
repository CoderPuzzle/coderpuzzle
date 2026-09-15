import "sort"

// Packs split freely across boxes, so only the apple total matters, not
// its division into packs. Filling the largest boxes first makes each
// selected box cover as much of the total as possible, so the prefix of
// the descending-sorted capacities is optimal.
func minimumBoxes(apple []int, capacity []int) int {
	total := 0
	for _, pack := range apple {
		total += pack
	}
	sort.Sort(sort.Reverse(sort.IntSlice(capacity)))
	filled := 0
	for count, room := range capacity {
		filled += room
		if filled >= total {
			return count + 1
		}
	}
	// The input guarantees a full redistribution is possible.
	return len(capacity)
}
