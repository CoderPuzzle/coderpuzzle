// Only one window can change: rewriting it forfeits the window's current
// weighted sum and collects the price sum of its second half. Prefix sums
// over prices and over strategy[i] * prices[i] make both parts an O(1)
// lookup per window position. Sums reach 10^10 in either direction, so
// everything widens to int64.
func maxProfit(prices []int, strategy []int, k int) int64 {
	n := len(prices)
	var base int64
	pricePrefix := make([]int64, n+1)
	weightedPrefix := make([]int64, n+1)
	for i := 0; i < n; i++ {
		base += int64(strategy[i]) * int64(prices[i])
		pricePrefix[i+1] = pricePrefix[i] + int64(prices[i])
		weightedPrefix[i+1] = weightedPrefix[i] + int64(strategy[i])*int64(prices[i])
	}
	// At most one modification, so the untouched plan is always a candidate.
	best := base
	half := k / 2
	for left := 0; left+k <= n; left++ {
		right := left + k
		removed := weightedPrefix[right] - weightedPrefix[left]
		gained := pricePrefix[right] - pricePrefix[left+half]
		if candidate := base - removed + gained; candidate > best {
			best = candidate
		}
	}
	return best
}
