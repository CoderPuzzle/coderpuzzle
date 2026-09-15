func coinChange(coins []int, amount int) int {
	// dp[a] = fewest coins for amount a; dp[0] = 0, every other amount
	// starts at inf = amount+1, which no real answer can reach, so the
	// sentinel propagates naturally and never wins a minimum.
	inf := amount + 1
	dp := make([]int, amount+1)
	for i := range dp {
		dp[i] = inf
	}
	dp[0] = 0
	// Amounts smallest-first, so dp[a-c] is already final when consulted.
	for a := 1; a <= amount; a++ {
		// Try every coin as the last one used: dp[a] = min(dp[a-c] + 1).
		for _, c := range coins {
			if c <= a && dp[a-c]+1 < dp[a] {
				dp[a] = dp[a-c] + 1
			}
		}
	}
	if dp[amount] >= inf {
		return -1
	}
	return dp[amount]
}
