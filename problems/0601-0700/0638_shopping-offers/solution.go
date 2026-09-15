// Memoized DFS over the remaining-needs vector. Every state offers the same
// two move kinds: buy one unit of any still-wanted item at its list price,
// or apply any special offer that fits inside the state — the fit check is
// what forbids buying more than wanted.
func shoppingOffers(price []int, special [][]int, needs []int) int {
	n := len(price)
	size := 1
	for i := 0; i < n; i++ {
		size *= 11
	}
	memo := make([]int, size)
	for i := range memo {
		memo[i] = -1
	}
	cur := append([]int(nil), needs...)

	var dfs func() int
	dfs = func() int {
		// Counts stay at most 10, so cur packs into one base-11 integer.
		key := 0
		empty := true
		for i := 0; i < n; i++ {
			key = key*11 + cur[i]
			if cur[i] > 0 {
				empty = false
			}
		}
		if empty {
			return 0
		}
		if memo[key] != -1 {
			return memo[key]
		}
		best := int(^uint(0)>>1) / 2
		// Move kind 1: one unit of item i, bought individually.
		for i := 0; i < n; i++ {
			if cur[i] > 0 {
				cur[i]--
				best = min(best, price[i]+dfs())
				cur[i]++
			}
		}
		// Move kind 2: a special offer, when it fits within cur.
		for _, offer := range special {
			fits := true
			for j := 0; j < n; j++ {
				if offer[j] > cur[j] {
					fits = false
					break
				}
			}
			if fits {
				for j := 0; j < n; j++ {
					cur[j] -= offer[j]
				}
				best = min(best, offer[n]+dfs())
				for j := 0; j < n; j++ {
					cur[j] += offer[j]
				}
			}
		}
		memo[key] = best
		return best
	}

	return dfs()
}
