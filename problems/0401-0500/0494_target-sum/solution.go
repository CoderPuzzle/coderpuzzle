func findTargetSumWays(nums []int, target int) int {
	// dp maps each reachable running sum to the number of sign assignments
	// producing it; one way to stand at 0 before any number.
	dp := map[int]int{0: 1}
	for _, value := range nums {
		// Each reachable total branches into +value and -value; identical
		// totals merge and their counts add, so the map stays bounded by
		// distinct sums, not 2^i.
		nxt := make(map[int]int, len(dp)*2)
		for total, count := range dp {
			nxt[total+value] += count
			nxt[total-value] += count
		}
		dp = nxt
	}
	return dp[target]
}
