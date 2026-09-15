func maxSum(grid [][]int) int {
	// Every hourglass is the top and bottom rows of a 3x3 submatrix
	// plus its center cell, so one pass over all top-left corners of
	// such submatrices visits each hourglass exactly once. Seven cells
	// of at most 1e6 sum to at most 7e6, well inside int.
	best := 0
	for r := 0; r+2 < len(grid); r++ {
		for c := 0; c+2 < len(grid[0]); c++ {
			current := grid[r][c] + grid[r][c+1] + grid[r][c+2] +
				grid[r+1][c+1] +
				grid[r+2][c] + grid[r+2][c+1] + grid[r+2][c+2]
			if current > best {
				best = current
			}
		}
	}
	return best
}
