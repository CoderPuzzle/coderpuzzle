func change(amount int, coins []int) int {
	// dp[a] = number of combinations summing exactly to a; dp[0] = 1 is
	// the empty combination.
	dp := make([]int, amount+1)
	dp[0] = 1
	// Coins outer, amounts inner: each multiset is built in one fixed coin
	// order, so combinations are counted once (reversed loops would count
	// permutations instead).
	for _, c := range coins {
		// Ascending reads dp[a-c] already updated for this coin — exactly
		// what lets a denomination repeat (unbounded knapsack).
		for a := c; a <= amount; a++ {
			dp[a] += dp[a-c]
		}
	}
	return dp[amount]
}
