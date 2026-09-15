import "sort"

// In a sorted layout, keeping bags equal to the value at index i means:
// remove everything before i entirely, and trim every later bag down to
// that value. Totals reach 10^10, so the running sums use int64.
func minimumRemoval(beans []int) int64 {
	total := int64(0)
	for _, bean := range beans {
		total += int64(bean)
	}
	ordered := make([]int, len(beans))
	copy(ordered, beans)
	sort.Ints(ordered)
	best := total // keep nothing (degenerate floor)
	n := len(ordered)
	for index, value := range ordered {
		keptTotal := int64(value) * int64(n-index)
		if total-keptTotal < best {
			best = total - keptTotal
		}
	}
	return best
}
