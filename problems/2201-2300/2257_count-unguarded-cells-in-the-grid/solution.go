func countUnguarded(m int, n int, guards [][]int, walls [][]int) int {
	const (
		wall    = 1
		guard   = 2
		guarded = 3
	)
	grid := make([][]int, m)
	for i := range grid {
		grid[i] = make([]int, n)
	}
	for _, w := range walls {
		grid[w[0]][w[1]] = wall
	}
	for _, g := range guards {
		grid[g[0]][g[1]] = guard
	}
	for _, g := range guards {
		for _, d := range [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
			row, col := g[0]+d[0], g[1]+d[1]
			for row >= 0 && row < m && col >= 0 && col < n &&
				grid[row][col] != wall && grid[row][col] != guard {
				grid[row][col] = guarded
				row += d[0]
				col += d[1]
			}
		}
	}
	count := 0
	for _, row := range grid {
		for _, cell := range row {
			if cell == 0 {
				count++
			}
		}
	}
	return count
}
