func minSkips(dist []int, speed int, hoursBefore int) int {
	// dp[j] = smallest accumulated time (in distance units) after the
	// current road with j skips used; rests already rounded. Rest:
	// ceil((t+d)/speed)*speed at same j; skip: t+d at j+1.
	n := len(dist)
	const INF = int64(1) << 60
	dp := make([]int64, n+1)
	for j := range dp {
		dp[j] = INF
	}
	dp[0] = 0
	for i := 0; i < n; i++ {
		d := int64(dist[i])
		ndp := make([]int64, n+1)
		for j := range ndp {
			ndp[j] = INF
		}
		if i == n-1 {
			for j := 0; j <= n; j++ {
				if dp[j] < INF && dp[j]+d < ndp[j] {
					ndp[j] = dp[j] + d
				}
			}
		} else {
			for j := 0; j < n; j++ {
				t := dp[j]
				if t >= INF {
					continue
				}
				arr := t + d
				if arr < ndp[j+1] {
					ndp[j+1] = arr
				}
				rested := (arr + int64(speed) - 1) / int64(speed) * int64(speed)
				if rested < ndp[j] {
					ndp[j] = rested
				}
			}
		}
		copy(dp, ndp)
	}
	limit := int64(hoursBefore) * int64(speed)
	for j := 0; j <= n; j++ {
		if dp[j] < INF && dp[j] <= limit {
			return j
		}
	}
	return -1
}
