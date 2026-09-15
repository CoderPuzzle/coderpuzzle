func maxSumAfterPartitioning(arr []int, k int) int64 {
	n := len(arr)
	dp := make([]int64, n+1)
	for i := 1; i <= n; i++ {
		var best int64
		runningMax := 0
		limit := k
		if i < limit {
			limit = i
		}
		for j := 1; j <= limit; j++ {
			if arr[i-j] > runningMax {
				runningMax = arr[i-j]
			}
			candidate := dp[i-j] + int64(runningMax)*int64(j)
			if candidate > best {
				best = candidate
			}
		}
		dp[i] = best
	}
	return dp[n]
}
