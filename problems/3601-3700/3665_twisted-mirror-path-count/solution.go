func uniquePaths(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	const mod = 1_000_000_007
	// Landing tables for mirror cells: entering a mirror while moving
	// right (br) turns the move down, while moving down (bd) turns it
	// right; -1 marks a chain that leaves the grid. Each deflection lands
	// one row below or one column right of the mirror hit, so a reverse
	// row-major sweep resolves every chain against entries that are
	// already final.
	br := make([]int, m*n)
	bd := make([]int, m*n)
	for k := range br {
		br[k] = -1
		bd[k] = -1
	}
	for i := m - 1; i >= 0; i-- {
		for j := n - 1; j >= 0; j-- {
			if grid[i][j] == 0 {
				continue
			}
			t := i*n + j
			if i+1 < m {
				if grid[i+1][j] == 0 {
					br[t] = t + n
				} else {
					br[t] = bd[t+n]
				}
			}
			if j+1 < n {
				if grid[i][j+1] == 0 {
					bd[t] = t + 1
				} else {
					bd[t] = br[t+1]
				}
			}
		}
	}
	// dp[k] counts the ways to stand on cell k. Every jump lands in a
	// strictly later row than the cell it leaves, so one row-major sweep
	// settles each cell before any descendant reads it.
	dp := make([]int, m*n)
	dp[0] = 1
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			v := dp[i*n+j]
			if v == 0 {
				continue
			}
			if j+1 < n {
				t := i*n + j + 1
				tgt := t
				if grid[i][j+1] == 1 {
					tgt = br[t]
				}
				if tgt >= 0 {
					dp[tgt] = (dp[tgt] + v) % mod
				}
			}
			if i+1 < m {
				t := (i+1)*n + j
				tgt := t
				if grid[i+1][j] == 1 {
					tgt = bd[t]
				}
				if tgt >= 0 {
					dp[tgt] = (dp[tgt] + v) % mod
				}
			}
		}
	}
	return dp[m*n-1]
}
