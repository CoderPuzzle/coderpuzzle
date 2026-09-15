func minScoreTriangulation(values []int) int {
	n := len(values)
	dp := make([][]int, n)
	for i := range dp {
		dp[i] = make([]int, n)
	}
	for gap := 2; gap < n; gap++ {
		for i := 0; i+gap < n; i++ {
			j := i + gap
			best := int(^uint(0) >> 1)
			for k := i + 1; k < j; k++ {
				candidate := dp[i][k] + dp[k][j] + values[i]*values[k]*values[j]
				if candidate < best {
					best = candidate
				}
			}
			dp[i][j] = best
		}
	}
	return dp[0][n-1]
}
