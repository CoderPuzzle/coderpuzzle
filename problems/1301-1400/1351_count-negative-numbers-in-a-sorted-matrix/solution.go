func countNegatives(grid [][]int) int {
	// Negatives are a per-row suffix and the boundary only moves left down
	// the columns, so one monotonically sliding pointer counts all.
	n := len(grid[0])
	count := 0
	col := n - 1
	for _, row := range grid {
		for col >= 0 && row[col] < 0 {
			col--
		}
		count += n - 1 - col
	}
	return count
}
