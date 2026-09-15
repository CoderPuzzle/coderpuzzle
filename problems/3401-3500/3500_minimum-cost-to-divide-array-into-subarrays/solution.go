func minimumCost(nums []int, cost []int, k int) int64 {
	n := len(nums)
	prefNums := make([]int64, n+1)
	prefCost := make([]int64, n+1)
	for i := 0; i < n; i++ {
		prefNums[i+1] = prefNums[i] + int64(nums[i])
		prefCost[i+1] = prefCost[i] + int64(cost[i])
	}

	const INF = int64(1) << 62
	// dp[i] = min cost to partition the suffix nums[i:]; empty suffix is free.
	dp := make([]int64, n+1)
	for i := range dp {
		dp[i] = INF
	}
	dp[n] = 0
	totalCost := prefCost[n]
	// Right-to-left so every suffix value dp[j+1] is ready when needed.
	for i := n - 1; i >= 0; i-- {
		best := INF
		// Take [i, j] as the first block. The k*index term telescopes: each
		// block is charged k * (cost mass from i to the array's end), a
		// self-contained penalty independent of later split choices.
		for j := i; j < n; j++ {
			// prefNums[j+1] is the whole-array prefix through j, matching the
			// nums[0..r] factor of the formula, not the block's own sum.
			seg := prefNums[j+1] * (prefCost[j+1] - prefCost[i])
			seg += int64(k) * (totalCost - prefCost[i])
			cand := seg + dp[j+1]
			if cand < best {
				best = cand
			}
		}
		dp[i] = best
	}
	return dp[0]
}
