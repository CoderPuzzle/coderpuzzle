func canPartition(nums []int) bool {
	total := 0
	for _, v := range nums {
		total += v
	}
	// An odd total cannot split into two equal halves.
	if total%2 != 0 {
		return false
	}
	target := total / 2
	// dp[s]: some subset of the numbers processed so far sums to s.
	dp := make([]bool, target+1)
	dp[0] = true
	for _, v := range nums {
		// Sweep sums downward so v is used at most once (0/1 knapsack).
		for j := target; j >= v; j-- {
			if dp[j-v] {
				dp[j] = true
			}
		}
		// Target reachable: the complement subset completes the split.
		if dp[target] {
			return true
		}
	}
	return dp[target]
}
