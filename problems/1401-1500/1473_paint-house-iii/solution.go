func minCost(houses []int, cost [][]int, m int, n int, target int) int {
	const inf = int(^uint(0) >> 1)
	dp := make([][]int, n+1)
	for j := range dp {
		dp[j] = make([]int, target+1)
		for k := range dp[j] {
			dp[j][k] = inf
		}
	}
	if houses[0] != 0 {
		dp[houses[0]][1] = 0
	} else {
		for j := 1; j <= n; j++ {
			dp[j][1] = cost[0][j-1]
		}
	}
	for i := 1; i < m; i++ {
		ndp := make([][]int, n+1)
		for j := range ndp {
			ndp[j] = make([]int, target+1)
			for k := range ndp[j] {
				ndp[j][k] = inf
			}
		}
		for j := 1; j <= n; j++ {
			if houses[i] != 0 && houses[i] != j {
				continue
			}
			cj := 0
			if houses[i] == 0 {
				cj = cost[i][j-1]
			}
			for pj := 1; pj <= n; pj++ {
				for k := 1; k <= target; k++ {
					if dp[pj][k] == inf {
						continue
					}
					nk := k
					if pj != j {
						nk = k + 1
					}
					if nk <= target && dp[pj][k]+cj < ndp[j][nk] {
						ndp[j][nk] = dp[pj][k] + cj
					}
				}
			}
		}
		dp = ndp
	}
	best := inf
	for j := 1; j <= n; j++ {
		if dp[j][target] < best {
			best = dp[j][target]
		}
	}
	if best == inf {
		return -1
	}
	return best
}
