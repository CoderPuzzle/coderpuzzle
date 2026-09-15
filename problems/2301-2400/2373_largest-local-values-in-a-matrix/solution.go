func largestLocal(grid [][]int) [][]int {
	// Two passes shrink the window work from 9 comparisons per output cell
	// to 6: first collapse every row of 3 horizontally, then take the
	// vertical max of those results.
	n := len(grid)
	rowMax := make([][]int, n)
	for i := range rowMax {
		rowMax[i] = make([]int, n-2)
		for j := 0; j+2 < n; j++ {
			rowMax[i][j] = max(grid[i][j], grid[i][j+1], grid[i][j+2])
		}
	}
	maxLocal := make([][]int, n-2)
	for i := 0; i+2 < n; i++ {
		maxLocal[i] = make([]int, n-2)
		for j := 0; j+2 < n; j++ {
			maxLocal[i][j] = max(rowMax[i][j], rowMax[i+1][j], rowMax[i+2][j])
		}
	}
	return maxLocal
}
