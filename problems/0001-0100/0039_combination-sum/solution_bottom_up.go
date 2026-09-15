import "sort"

func combinationSum(candidates []int, target int) [][]int {
	// Candidate value -> position, so the ways can be reported in the
	// order the backtracking search would meet them.
	position := make(map[int]int)
	for index, value := range candidates {
		position[value] = index
	}
	// table[amount] holds every way of reaching that amount with the
	// candidates processed so far. Owing nothing has exactly one way --
	// the empty one -- which seeds the sweep.
	table := make([][][]int, target+1)
	table[0] = append(table[0], []int{})
	for _, value := range candidates {
		for amount := value; amount <= target; amount++ {
			// Extend every way that is exactly `value` short. A way may
			// already contain this candidate: that is the unlimited
			// reuse, falling out of ascending amounts within one pass.
			for _, way := range table[amount-value] {
				extended := make([]int, len(way)+1)
				copy(extended, way)
				extended[len(way)] = value
				table[amount] = append(table[amount], extended)
			}
		}
	}
	ways := table[target]
	// An unreachable target leaves the row never appended to, which in Go
	// marshals as null -- report the empty list instead.
	if ways == nil {
		return [][]int{}
	}
	// Candidate-outer passes pin each way to one order (its values grouped
	// by candidate position), but the table fills in amount order, so a
	// final lexicographic sort by position restores the discovery order.
	sort.Slice(ways, func(a, b int) bool {
		first, second := ways[a], ways[b]
		shared := len(first)
		if len(second) < shared {
			shared = len(second)
		}
		for i := 0; i < shared; i++ {
			pa, pb := position[first[i]], position[second[i]]
			if pa != pb {
				return pa < pb
			}
		}
		return len(first) < len(second)
	})
	return ways
}
