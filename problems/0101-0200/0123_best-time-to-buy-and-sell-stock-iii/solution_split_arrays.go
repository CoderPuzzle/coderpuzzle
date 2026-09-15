func maxProfit(prices []int) int {
	// Split the timeline at a day: the first sale must close by it, the
	// second must open at or after it, so the best plan is the best sale in
	// the days up to it plus the best sale in the days from it. Two
	// half-line scans tabulate those bests for every split at once.
	n := len(prices)
	// Forward: bestPrefix[i] is the best single-sale profit over days
	// 0..i -- the running minimum buys and day i's price sells.
	bestPrefix := make([]int, n)
	minPrice := prices[0]
	for i := 1; i < n; i++ {
		if prices[i] < minPrice {
			minPrice = prices[i]
		}
		best := bestPrefix[i-1]
		if p := prices[i] - minPrice; p > best {
			best = p
		}
		bestPrefix[i] = best
	}
	// Backward: bestSuffix[i] is the best single-sale profit over days
	// i..n-1 -- day i's price buys and the running maximum sells.
	bestSuffix := make([]int, n)
	maxPrice := prices[n-1]
	for i := n - 2; i >= 0; i-- {
		if prices[i] > maxPrice {
			maxPrice = prices[i]
		}
		best := bestSuffix[i+1]
		if p := maxPrice - prices[i]; p > best {
			best = p
		}
		bestSuffix[i] = best
	}
	// Both tables floor at 0, so an unused half of a split is a same-day
	// zero-profit sale -- Hint 3's placeholder -- and plans trading once or
	// never (split at n-1, where bestSuffix is 0) need no special casing. A
	// sale ending on the split day may share it with the next purchase:
	// selling and rebuying at one price is financially just holding, so it
	// never inflates the total.
	best := 0
	for i, first := range bestPrefix {
		if total := first + bestSuffix[i]; total > best {
			best = total
		}
	}
	return best
}
