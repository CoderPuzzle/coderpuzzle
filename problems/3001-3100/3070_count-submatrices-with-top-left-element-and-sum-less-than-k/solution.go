func countSubmatrices(grid [][]int, k int) int {
	rows, cols := len(grid), len(grid[0])
	// colSums[j] accumulates column j over rows 0..i, so a submatrix
	// anchored at (0, 0) is identified by its bottom-right corner (i, j).
	colSums := make([]int64, cols)
	count := 0
	for i := 0; i < rows; i++ {
		prefix := int64(0)
		for j := 0; j < cols; j++ {
			colSums[j] += int64(grid[i][j])
			// prefix is the rectangle sum grid[0..i][0..j].
			prefix += colSums[j]
			// Values are non-negative, so sums only grow with j: once the
			// prefix exceeds k, every further corner in this row fails too.
			if prefix > int64(k) {
				break
			}
			count++
		}
	}
	return count
}
