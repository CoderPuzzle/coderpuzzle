// Every sale is fixed by two days: the day it sells and the cheapest day
// before it, so one pass folding two values answers everything.
func maxProfit(prices []int) int {
	cheapest, best := prices[0], 0
	for _, price := range prices {
		// The cheapest prefix so far; on the day it drops to price itself,
		// price - cheapest is 0, so a day can never sell to itself.
		cheapest = min(cheapest, price)
		best = max(best, price-cheapest)
	}
	return best
}
