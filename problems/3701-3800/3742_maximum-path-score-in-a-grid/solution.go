func maxPathScore(grid [][]int, k int) int {
	m, n := len(grid), len(grid[0])
	// A path starts on a free cell, so it can charge at most m+n-2 times:
	// budget states beyond min(k, m+n-2) cannot occur.
	cap := min(k, m+n-2)
	const unreachable = -(1 << 30)
	// dp[j][c]: best score collected on a path ending at column j of the
	// current row with total cost exactly c; unreachable states sit far
	// below every real score. Cell (0, 0) is 0 by the constraints, so it
	// seeds score 0 at cost 0.
	dp := make([][]int, n)
	for j := range dp {
		dp[j] = make([]int, cap+1)
		for c := range dp[j] {
			dp[j][c] = unreachable
		}
	}
	dp[0][0] = 0
	for i := 0; i < m; i++ {
		next := make([][]int, n)
		for j := range next {
			next[j] = make([]int, cap+1)
			for c := range next[j] {
				next[j][c] = unreachable
			}
		}
		for j := 0; j < n; j++ {
			charge := 0
			if grid[i][j] > 0 {
				charge = 1
			}
			for c := charge; c <= cap; c++ {
				best := unreachable
				if dp[j][c-charge] > best {
					best = dp[j][c-charge]
				}
				if j > 0 && next[j-1][c-charge] > best {
					best = next[j-1][c-charge]
				}
				if best > unreachable/2 {
					next[j][c] = best + grid[i][j]
				}
			}
		}
		dp = next
	}
	best := unreachable
	for _, state := range dp[n-1] {
		if state > best {
			best = state
		}
	}
	if best >= 0 {
		return best
	}
	return -1
}
