import "sort"

func earliestFullBloom(plantTime []int, growTime []int) int {
	idx := make([]int, len(plantTime))
	for i := range idx {
		idx[i] = i
	}
	// Total planting time is fixed regardless of order, so only the order
	// matters: by an exchange argument, plant slow-growing seeds first so
	// their long growth overlaps the planting of the rest.
	sort.SliceStable(idx, func(a, b int) bool {
		return growTime[idx[a]] > growTime[idx[b]]
	})
	best := 0
	prefix := 0
	for _, i := range idx {
		// prefix is when seed i finishes planting; it blooms at
		// prefix + growTime[i]. The answer is the max over all seeds — a
		// seed finished early can still bloom last.
		prefix += plantTime[i]
		if prefix+growTime[i] > best {
			best = prefix + growTime[i]
		}
	}
	return best
}
