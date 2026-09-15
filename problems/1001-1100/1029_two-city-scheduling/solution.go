import "sort"

func twoCitySchedCost(costs [][]int) int {
	// Switching person i from B to A changes the total by a_i - b_i alone,
	// so the cheapest plan applies the n smallest differences.
	ordered := make([][]int, len(costs))
	copy(ordered, costs)
	sort.Slice(ordered, func(a, b int) bool {
		return ordered[a][0]-ordered[a][1] < ordered[b][0]-ordered[b][1]
	})
	// First half (most negative differences) flies A, rest fly B — the
	// split satisfies the half/half count structurally.
	n := len(ordered) / 2
	total := 0
	for i, cost := range ordered {
		if i < n {
			total += cost[0]
		} else {
			total += cost[1]
		}
	}
	return total
}
