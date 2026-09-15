func maxProfit(prices []int) int {
	// End-of-day states: hold (own a share), sold (just sold today),
	// rest (own nothing, free to buy). The sentinel makes owning a
	// share before any purchase impossible.
	hold, sold, rest := -1000000000, 0, 0
	for _, price := range prices {
		// Cache yesterday's sold first: rest may only absorb a sale
		// made the day before, which is the cooldown.
		prevSold := sold
		// Keep the share, or buy at today's price from yesterday's
		// rest wealth (rest is rewritten after this read).
		if rest-price > hold {
			hold = rest - price
		}
		// Sell into today's price.
		sold = hold + price
		// Stay at rest or absorb the cached sale; since it is
		// yesterday's, the earliest rebuy is two days after selling.
		if prevSold > rest {
			rest = prevSold
		}
	}
	// Ending while holding is worthless: an unsold purchase only
	// ever subtracted from wealth.
	if sold > rest {
		return sold
	}
	return rest
}
