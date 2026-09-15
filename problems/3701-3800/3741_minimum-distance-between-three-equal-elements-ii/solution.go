func minimumDistance(nums []int) int {
	// The three pairwise gaps of a good tuple telescope to twice the span
	// between its outermost indices, so the closest tuple is the one whose
	// outermost same-value indices are nearest. Every value gets its own
	// bucket of indices, filled in one left-to-right pass so each bucket
	// comes out sorted for free.
	n := len(nums)
	groups := make([][]int, n+1)
	for index, num := range nums {
		groups[num] = append(groups[num], index)
	}
	// Inside a sorted bucket no triple beats some consecutive window: the
	// two entries immediately following any entry sit no later than the
	// other two entries of any triple opened there, so their window spans
	// no more.
	best := -1
	for _, indices := range groups {
		for start := 0; start+2 < len(indices); start++ {
			span := indices[start+2] - indices[start]
			if best == -1 || span < best {
				best = span
			}
		}
	}
	// The best span stays unset unless some value occurs at least three
	// times; otherwise no good tuple exists.
	if best == -1 {
		return -1
	}
	return 2 * best
}
