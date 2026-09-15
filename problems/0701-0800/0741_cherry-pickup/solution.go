func cherryPickup(grid [][]int) int {
	n := len(grid)
	// dp[r1][r2]: best cherries with walker 1 at (r1, t-r1) and walker 2 at
	// (r2, t-r2) after t steps; -1 marks unreachable states.
	dp := make([][]int, n)
	for r := range dp {
		dp[r] = make([]int, n)
		for c := range dp[r] {
			dp[r][c] = -1
		}
	}
	dp[0][0] = grid[0][0]
	for t := 1; t <= 2*n-2; t++ {
		ndp := make([][]int, n)
		for r := range ndp {
			ndp[r] = make([]int, n)
			for c := range ndp[r] {
				ndp[r][c] = -1
			}
		}
		lo, hi := max(0, t-n+1), min(n-1, t)
		for r1 := lo; r1 <= hi; r1++ {
			c1 := t - r1
			if grid[r1][c1] == -1 {
				continue
			}
			for r2 := r1; r2 <= hi; r2++ {
				c2 := t - r2
				if grid[r2][c2] == -1 {
					continue
				}
				best := -1
				for pr1 := r1 - 1; pr1 <= r1; pr1++ {
					for pr2 := r2 - 1; pr2 <= r2; pr2++ {
						if pr1 >= 0 && pr1 < n && pr2 >= 0 && pr2 < n && dp[pr1][pr2] > best {
							best = dp[pr1][pr2]
						}
					}
				}
				if best < 0 {
					continue
				}
				gain := grid[r1][c1]
				if r1 != r2 {
					gain += grid[r2][c2]
				}
				ndp[r1][r2] = best + gain
			}
		}
		dp = ndp
	}
	if dp[n-1][n-1] < 0 {
		return 0
	}
	return dp[n-1][n-1]
}
