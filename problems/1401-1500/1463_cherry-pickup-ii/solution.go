func cherryPickup(grid [][]int) int {
	rows := len(grid)
	cols := len(grid[0])
	const NEG = -(1 << 30)
	dp := make([][]int, cols)
	for c := range dp {
		dp[c] = make([]int, cols)
		for c2 := range dp[c] {
			dp[c][c2] = NEG
		}
	}
	// both robots drop one row per step, so the state is just the column
	// pair; unreachable states stay at NEG and never win a max. Row 0 starts
	// with robot 1 leftmost, robot 2 rightmost; a one-column grid has both
	// share the start cell, counted once
	dp[0][cols-1] = grid[0][0]
	if cols > 1 {
		dp[0][cols-1] += grid[0][cols-1]
	}
	for r := 1; r < rows; r++ {
		ndp := make([][]int, cols)
		for c := range ndp {
			ndp[c] = make([]int, cols)
			for c2 := range ndp[c] {
				ndp[c][c2] = NEG
			}
		}
		for c1 := 0; c1 < cols; c1++ {
			for c2 := 0; c2 < cols; c2++ {
				// best of the 9 predecessor column pairs (each robot
				// steps by -1, 0, or +1 between rows)
				best := NEG
				for d1 := -1; d1 <= 1; d1++ {
					for d2 := -1; d2 <= 1; d2++ {
						p1, p2 := c1+d1, c2+d2
						if p1 >= 0 && p1 < cols && p2 >= 0 && p2 < cols && dp[p1][p2] > best {
							best = dp[p1][p2]
						}
					}
				}
				if best > NEG {
					// both cells harvested, except a shared cell counts once
					ndp[c1][c2] = best + grid[r][c1]
					if c1 != c2 {
						ndp[c1][c2] += grid[r][c2]
					}
				}
			}
		}
		dp = ndp
	}
	// every move is strictly downward, so all paths reach the bottom row
	// together — the answer is the best entry of the last table
	ans := NEG
	for c1 := 0; c1 < cols; c1++ {
		for c2 := 0; c2 < cols; c2++ {
			if dp[c1][c2] > ans {
				ans = dp[c1][c2]
			}
		}
	}
	return ans
}
