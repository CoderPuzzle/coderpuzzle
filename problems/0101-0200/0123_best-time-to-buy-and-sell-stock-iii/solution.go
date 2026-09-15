func maxProfit(prices []int) int {
	// Wealth after each day in four states: after the first buy, first
	// sell, second buy, second sell. Buy states start at -1e9, a sentinel
	// meaning "not yet reachable" (prices are at most 1e5, so no real
	// debt is that deep); sell states start at 0 = never traded.
	buy1, buy2, sell1, sell2 := -1000000000, -1000000000, 0, 0
	for _, price := range prices {
		// Each state either keeps yesterday's value or transitions today:
		// buying adds -price, selling adds +price, on top of the
		// preceding state. The first if is the cheapest first buy so far.
		if -price > buy1 {
			buy1 = -price
		}
		if buy1+price > sell1 {
			sell1 = buy1 + price
		}
		if sell1-price > buy2 {
			buy2 = sell1 - price
		}
		if buy2+price > sell2 {
			sell2 = buy2 + price
		}
	}
	// Each update reads the already-updated earlier states, so a
	// same-day buy-and-sell is allowed -- a zero-profit degenerate
	// transaction stands in for "do nothing", removing any need for a
	// transaction-count dimension. Hence sell2 >= sell1 >= 0 always,
	// and sell2 is correct even for plans using fewer transactions.
	return sell2
}
