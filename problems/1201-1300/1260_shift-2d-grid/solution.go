func shiftGrid(grid [][]int, k int) [][]int {
	m, n := len(grid), len(grid[0])
	total := m * n
	k %= total
	// One shift = a cyclic right-rotation of the flattened grid.
	shifted := make([]int, total)
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			shifted[(r*n+c+k)%total] = grid[r][c]
		}
	}
	result := make([][]int, m)
	for i := range result {
		result[i] = make([]int, n)
	}
	for i := 0; i < total; i++ {
		result[i/n][i%n] = shifted[i]
	}
	return result
}
