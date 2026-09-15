import "sort"

// Every unselected child loses 1 per turn, so the child picked in turn i
// (0-based) contributes its original value minus i, floored at 0. Values
// only shrink while waiting, so taking the largest available each turn is
// optimal. Widen to int64 before accumulating: the total reaches
// 2e5 * 1e8 = 2e13, far past what an int32 can hold.
func maximumHappinessSum(happiness []int, k int) int64 {
	sort.Sort(sort.Reverse(sort.IntSlice(happiness)))
	total := int64(0)
	for turn := 0; turn < k; turn++ {
		value := int64(happiness[turn]) - int64(turn)
		if value > 0 {
			total += value
		}
	}
	return total
}
