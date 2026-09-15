// Any optimal plan can bank every rise: selling the day before a fall and
// buying back at the bottom is never worse than holding through it, so the
// maximum profit is the sum of the positive daily deltas.
func maxProfit(prices []int) int {
	profit := 0
	for day := 1; day < len(prices); day++ {
		// Falling and flat days contribute nothing; a rising day is pocketed.
		if prices[day] > prices[day-1] {
			profit += prices[day] - prices[day-1]
		}
	}
	// A single price never enters the loop, so it correctly yields 0.
	return profit
}
