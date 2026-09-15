func minArrayLength(nums []int, k int) int {
	// A zero merges with anything (0 * y = 0 <= k), so it drags the whole
	// array down to a single element.
	for _, v := range nums {
		if v == 0 {
			return 1
		}
	}
	// Merge adjacent ones (1 * 1 = 1 <= k) so no two neighbors are both 1;
	// every remaining pair then multiplies to at least 2, which bounds
	// each backward scan by 2 * log2(k).
	b := make([]int, 0, len(nums))
	for _, v := range nums {
		if v != 1 || len(b) == 0 || b[len(b)-1] != 1 {
			b = append(b, v)
		}
	}
	m := len(b)
	dp := make([]int, m+1)
	for i := 1; i <= m; i++ {
		dp[i] = dp[i-1] + 1
		// Walk left multiplying while the merged product stays <= k:
		// each surviving j is the block b[j-1..i-1] merged to one spot.
		// Products reach k * 1e9, so the product is int64.
		prod := int64(1)
		for j := i; j >= 1; j-- {
			prod *= int64(b[j-1])
			if prod > int64(k) {
				break
			}
			if cand := dp[j-1] + 1; cand < dp[i] {
				dp[i] = cand
			}
		}
	}
	return dp[m]
}
