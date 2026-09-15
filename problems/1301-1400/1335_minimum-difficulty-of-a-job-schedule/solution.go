func minDifficulty(jobDifficulty []int, d int) int {
	n := len(jobDifficulty)
	if n < d {
		return -1
	}
	const inf = 1 << 30
	dp := make([][]int, d+1)
	for j := range dp {
		dp[j] = make([]int, n+1)
		for i := range dp[j] {
			dp[j][i] = inf
		}
	}
	dp[0][0] = 0
	for j := 1; j <= d; j++ {
		for i := j; i <= n; i++ {
			dayMax := 0
			best := inf
			for k := i; k >= j; k-- {
				if jobDifficulty[k-1] > dayMax {
					dayMax = jobDifficulty[k-1]
				}
				prev := dp[j-1][k-1]
				if prev != inf && prev+dayMax < best {
					best = prev + dayMax
				}
			}
			dp[j][i] = best
		}
	}
	return dp[d][n]
}
