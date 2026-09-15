import "sort"

func maxDistance(position []int, m int) int {
	pos := make([]int, len(position))
	copy(pos, position)
	sort.Ints(pos)

	feasible := func(distance int) bool {
		// Greedy: the first ball sits at the leftmost basket (count = 1),
		// then each ball takes the first basket at least `distance` beyond
		// the last placed one. Earliest-possible placement is never worse,
		// so failure here means no placement works.
		count := 1
		last := pos[0]
		for _, p := range pos[1:] {
			if p-last >= distance {
				count++
				last = p
				if count >= m {
					// All balls placed — exit early.
					return true
				}
			}
		}
		return count >= m
	}

	// Feasibility is monotone in the spacing, so binary search the largest
	// feasible d over [1, span]; the upper-mid form keeps the search moving
	// when lo and hi become adjacent.
	lo, hi := 1, pos[len(pos)-1]-pos[0]
	for lo < hi {
		mid := lo + (hi-lo+1)/2
		if feasible(mid) {
			lo = mid
		} else {
			hi = mid - 1
		}
	}
	return lo
}
