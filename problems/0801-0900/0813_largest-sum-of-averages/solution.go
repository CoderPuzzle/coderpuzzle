func largestSumOfAverages(nums []int, k int) float64 {
	n := len(nums)
	prefix := make([]int64, n+1)
	for i := 0; i < n; i++ {
		prefix[i+1] = prefix[i] + int64(nums[i])
	}

	// dp[i] = best(i, groups) for the current group count.
	// groups == 1: the whole remaining suffix is one group.
	dp := make([]float64, n)
	for i := 0; i < n; i++ {
		dp[i] = float64(prefix[n]-prefix[i]) / float64(n-i)
	}

	for groups := 2; groups <= k; groups++ {
		ndp := make([]float64, n)
		for i := 0; i <= n-groups; i++ {
			result := 0.0
			for j := i + 1; j <= n-groups+1; j++ {
				candidate := float64(prefix[j]-prefix[i])/float64(j-i) + dp[j]
				if candidate > result {
					result = candidate
				}
			}
			ndp[i] = result
		}
		dp = ndp
	}

	return dp[0]
}
