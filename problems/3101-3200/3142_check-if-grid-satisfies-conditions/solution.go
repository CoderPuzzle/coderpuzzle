// Every column must read the same value top to bottom, and adjacent
// columns must differ. Once a column is verified constant, comparing just
// its top cell with the next column's top cell polices every vertical pair
// of the horizontal rule at once, so one column-wise sweep suffices.
func satisfiesConditions(grid [][]int) bool {
	for j := 0; j < len(grid[0]); j++ {
		for i := 1; i < len(grid); i++ {
			if grid[i][j] != grid[0][j] {
				return false
			}
		}
		if j+1 < len(grid[0]) && grid[0][j] == grid[0][j+1] {
			return false
		}
	}
	return true
}
