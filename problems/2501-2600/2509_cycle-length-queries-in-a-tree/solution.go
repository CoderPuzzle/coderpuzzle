func cycleLengthQueries(n int, queries [][]int) []int {
	// Adding edge (a, b) closes exactly one cycle: the unique tree path
	// between a and b plus the new edge. Walking the deeper endpoint up
	// one parent (v / 2) at a time until both endpoints meet visits
	// exactly the edges of that path, so the answer is one more than
	// the number of steps taken. Values stay below 2^30, so each walk
	// is at most 30 steps.
	answer := make([]int, len(queries))
	for qi, query := range queries {
		a, b := query[0], query[1]
		steps := 1
		for a != b {
			if a > b {
				a >>= 1
			} else {
				b >>= 1
			}
			steps++
		}
		answer[qi] = steps
	}
	return answer
}
