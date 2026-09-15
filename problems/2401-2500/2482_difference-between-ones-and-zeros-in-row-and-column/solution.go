func onesMinusZeros(grid [][]int) [][]int {
	// Precompute each row's and column's one-count once; the zero counts
	// follow as n - onesRow and m - onesCol, collapsing the cell formula
	// to 2*onesRow + 2*onesCol - m - n.
	m, n := len(grid), len(grid[0])
	rowOnes := make([]int, m)
	colOnes := make([]int, n)
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			rowOnes[i] += grid[i][j]
			colOnes[j] += grid[i][j]
		}
	}
	diff := make([][]int, m)
	for i := 0; i < m; i++ {
		diff[i] = make([]int, n)
		for j := 0; j < n; j++ {
			diff[i][j] = 2*rowOnes[i] + 2*colOnes[j] - m - n
		}
	}
	return diff
}
