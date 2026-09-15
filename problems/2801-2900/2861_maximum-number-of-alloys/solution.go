// Binary search the alloy count. Making x alloys on one machine costs
// sum(max(0, x * composition[m][j] - stock[j]) * cost[j]) coins, which
// never decreases as x grows, so affordability is monotone and the largest
// feasible count can be bisected. The count is bounded by min(stock) +
// budget: the metal with the smallest stock needs at least x - stock[j]
// units bought and any unit costs at least one coin. Every machine is
// probed per candidate count; the spend total reaches about 2e12, wider
// than a 32-bit int, so it is accumulated in int64.
func maxNumberOfAlloys(n int, k int, budget int, composition [][]int, stock []int, cost []int) int {
	affordable := func(machine []int, count int64) bool {
		spent := int64(0)
		for j := 0; j < n; j++ {
			need := count*int64(machine[j]) - int64(stock[j])
			if need > 0 {
				spent += need * int64(cost[j])
				if spent > int64(budget) {
					return false
				}
			}
		}
		return true
	}
	minStock := stock[0]
	for _, s := range stock[1:] {
		if s < minStock {
			minStock = s
		}
	}
	best := 0
	low, high := int64(0), int64(minStock)+int64(budget)
	for low <= high {
		mid := low + (high-low)/2
		ok := false
		for m := 0; m < k && !ok; m++ {
			ok = affordable(composition[m], mid)
		}
		if ok {
			best = int(mid)
			low = mid + 1
		} else {
			high = mid - 1
		}
	}
	return best
}
