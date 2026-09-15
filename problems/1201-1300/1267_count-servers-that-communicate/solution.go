func countServers(grid [][]int) int {
	// A server communicates iff its row or its column holds another
	// server — any communicating partner must share one of those lines,
	// so tallies per line settle it without searching the pair graph.
	m, n := len(grid), len(grid[0])
	row := make([]int, m)
	col := make([]int, n)
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			if grid[r][c] == 1 {
				row[r]++
				col[c]++
			}
		}
	}
	total := 0
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			if grid[r][c] == 1 && (row[r] > 1 || col[c] > 1) {
				total++
			}
		}
	}
	return total
}
