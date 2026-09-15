import "sort"

func countPaths(grid [][]int) int {
	const MOD = 1000000007
	m, n := len(grid), len(grid[0])
	type cell struct{ v, i, j int }
	cells := make([]cell, 0, m*n)
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			cells = append(cells, cell{grid[i][j], i, j})
		}
	}
	// Decreasing value order: when (i, j) is handled, every strictly
	// larger neighbor's dp entry is already final.
	sort.Slice(cells, func(x, y int) bool {
		return cells[x].v > cells[y].v
	})
	// dp[i][j] = number of increasing paths starting at (i, j);
	// 1 accounts for the length-1 path of the cell itself.
	dp := make([][]int64, m)
	for i := range dp {
		dp[i] = make([]int64, n)
		for j := range dp[i] {
			dp[i][j] = 1
		}
	}
	dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	for _, c := range cells {
		for _, d := range dirs {
			ni, nj := c.i+d[0], c.j+d[1]
			// Strict '>' skips equal values, so plateau cells never
			// chain (an increasing path can never revisit a cell).
			if ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] > c.v {
				dp[c.i][c.j] = (dp[c.i][c.j] + dp[ni][nj]) % MOD
			}
		}
	}
	// A path is identified by its starting cell, so sum dp everywhere.
	var total int64
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			total = (total + dp[i][j]) % MOD
		}
	}
	return int(total)
}
