func minSpaceWastedKResizing(nums []int, k int) int {
	n := len(nums)
	prefix := make([]int64, n+1)
	for i := 0; i < n; i++ {
		prefix[i+1] = prefix[i] + int64(nums[i])
	}
	// g[i][j] = waste if a single allocation covers nums[i..j]
	g := make([][]int64, n)
	for i := range g {
		g[i] = make([]int64, n)
	}
	for i := 0; i < n; i++ {
		var mx int64
		for j := i; j < n; j++ {
			if int64(nums[j]) > mx {
				mx = int64(nums[j])
			}
			g[i][j] = mx*int64(j-i+1) - (prefix[j+1] - prefix[i])
		}
	}
	const INF = int64(1) << 60
	// dp[j][i] = min waste for suffix starting at i using j segments
	dp := make([][]int64, k+2)
	for j := range dp {
		dp[j] = make([]int64, n+1)
		for i := range dp[j] {
			dp[j][i] = INF
		}
	}
	dp[0][n] = 0
	for j := 1; j < k+2; j++ {
		for i := n - 1; i >= 0; i-- {
			best := INF
			for t := i; t < n; t++ {
				if dp[j-1][t+1] < INF {
					cand := g[i][t] + dp[j-1][t+1]
					if cand < best {
						best = cand
					}
				}
			}
			dp[j][i] = best
		}
	}
	return int(dp[k+1][0])
}
