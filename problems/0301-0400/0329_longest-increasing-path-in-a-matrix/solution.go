import "sort"

func longestIncreasingPath(matrix [][]int) int {
	m, n := len(matrix), len(matrix[0])
	type cell struct{ v, i, j int }
	cells := make([]cell, 0, m*n)
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			cells = append(cells, cell{matrix[i][j], i, j})
		}
	}
	// Strictly increasing paths make the cells a DAG (edges point to
	// larger neighbors), so ascending value order is a topological order.
	sort.Slice(cells, func(a, b int) bool {
		return cells[a].v < cells[b].v
	})
	// dp[i][j] = longest increasing path starting at (i, j); 1 = cell alone.
	dp := make([][]int, m)
	for i := range dp {
		dp[i] = make([]int, n)
		for j := range dp[i] {
			dp[i][j] = 1
		}
	}
	best := 1
	dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	for _, c := range cells {
		// Smaller neighbors appear earlier in the sort, so their dp is
		// final; strict < so equal-valued neighbors never link.
		for _, d := range dirs {
			ni, nj := c.i+d[0], c.j+d[1]
			if ni >= 0 && ni < m && nj >= 0 && nj < n && matrix[ni][nj] < c.v {
				if dp[ni][nj]+1 > dp[c.i][c.j] {
					dp[c.i][c.j] = dp[ni][nj] + 1
				}
			}
		}
		if dp[c.i][c.j] > best {
			best = dp[c.i][c.j]
		}
	}
	return best
}
