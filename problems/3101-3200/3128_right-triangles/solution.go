func numberOfRightTriangles(grid [][]int) int64 {
	// Every right triangle has a unique corner cell: its horizontal leg
	// endpoint and vertical leg endpoint can be picked independently from
	// the other 1s in that row and column. A collinear triple never
	// qualifies, so the corner count is exact. Accumulate in int64: up to
	// 10^6 * 999 * 999 ~= 9.98e11 > 2^31.
	rows := len(grid)
	cols := len(grid[0])
	rowOnes := make([]int64, rows)
	colOnes := make([]int64, cols)
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == 1 {
				rowOnes[r]++
				colOnes[c]++
			}
		}
	}
	var total int64
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == 1 {
				total += (rowOnes[r] - 1) * (colOnes[c] - 1)
			}
		}
	}
	return total
}
