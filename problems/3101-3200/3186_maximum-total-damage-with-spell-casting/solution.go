import "sort"

func maximumTotalDamage(power []int) int64 {
	// Copies of equal damage act as one all-or-nothing group worth
	// count * v (casting any copy already bans the rest of that value).
	// Sort unique damages ascending and run a forward take/skip DP where
	// taking v requires predecessors <= v - 3, tracked by a monotone
	// left pointer. Totals reach 10^14 at the bounds, far beyond an
	// int32, so run the gains in an int64.
	totals := make(map[int]int64)
	for _, value := range power {
		totals[value] += int64(value)
	}
	keys := make([]int, 0, len(totals))
	for key := range totals {
		keys = append(keys, key)
	}
	sort.Ints(keys)
	m := len(keys)
	best := make([]int64, m)
	left := 0
	for j := 0; j < m; j++ {
		v := keys[j]
		for keys[left] <= v-3 {
			left++
		}
		take := totals[v]
		if left > 0 {
			take += best[left-1]
		}
		skip := int64(0)
		if j > 0 {
			skip = best[j-1]
		}
		if take > skip {
			best[j] = take
		} else {
			best[j] = skip
		}
	}
	return best[m-1]
}
