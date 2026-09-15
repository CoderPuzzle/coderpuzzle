import "sort"

func maxPrice(items [][]int, capacity int) float64 {
	totalWeight := 0
	for _, item := range items {
		totalWeight += item[1]
	}
	// Divisibility makes this fractional knapsack: moving a unit of weight
	// from a cheaper to a dearer price-per-weight item never lowers the total,
	// so a greedy fill in unit-price order is optimal. If even all items
	// together weigh less than the bag, no packing can fill it.
	if totalWeight < capacity {
		return -1.0
	}
	// Stable sort by price-per-weight ratio, descending.
	ordered := make([][]int, len(items))
	copy(ordered, items)
	sort.SliceStable(ordered, func(i, j int) bool {
		return float64(ordered[i][0])/float64(ordered[i][1]) > float64(ordered[j][0])/float64(ordered[j][1])
	})
	price := 0.0
	remaining := capacity
	for _, item := range ordered {
		if remaining <= 0 {
			break
		}
		p, w := item[0], item[1]
		if w <= remaining {
			price += float64(p)
			remaining -= w
		} else {
			// First item heavier than what remains: take just the fraction
			// remaining/w of it — the only floating-point step.
			price += float64(p) * (float64(remaining) / float64(w))
			remaining = 0
		}
	}
	return price
}
