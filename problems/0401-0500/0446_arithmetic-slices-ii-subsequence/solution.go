func numberOfArithmeticSlices(nums []int) int {
	n := len(nums)
	// dp[i][d] = number of arithmetic subsequences of length >= 2 ending at
	// i with common difference d. Hashing per (index, difference) absorbs
	// the huge, possibly negative differences.
	dp := make([]map[int64]int64, n)
	for i := range dp {
		dp[i] = make(map[int64]int64)
	}
	var total int64 = 0
	for i := 0; i < n; i++ {
		for j := 0; j < i; j++ {
			d := int64(nums[i]) - int64(nums[j])
			cnt := dp[j][d]
			// Each length >= 2 subsequence ending at j extends by nums[i]
			// into a slice of length >= 3, counted once at its last element.
			total += cnt
			// cnt extensions plus the new length-2 pair (j, i) itself;
			// pairs of exactly length 2 reach the total only via extension.
			dp[i][d] += cnt + 1
		}
	}
	return int(total)
}
