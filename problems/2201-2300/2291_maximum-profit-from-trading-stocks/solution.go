func maximumProfit(present []int, future []int, budget int) int {
	dp := make([]int, budget+1)
	for i := range present {
		price := present[i]
		gain := future[i] - price
		if gain <= 0 {
			continue
		}
		for money := budget; money >= price; money-- {
			if dp[money-price]+gain > dp[money] {
				dp[money] = dp[money-price] + gain
			}
		}
	}
	return dp[budget]
}
