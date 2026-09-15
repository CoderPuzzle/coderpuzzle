func searchMatrix(matrix [][]int, target int) bool {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return false
	}
	// Start at the top-right corner: largest in its row and smallest in
	// its column, so one comparison eliminates a whole row or column.
	row, col := 0, len(matrix[0])-1
	for row < len(matrix) && col >= 0 {
		value := matrix[row][col]
		if value == target {
			return true
		}
		// Everything below in this column is even larger, so discard
		// the whole column by moving left.
		if value > target {
			col--
		} else {
			// Everything to the left in this row is even smaller, so
			// discard the whole row by moving down.
			row++
		}
	}
	// Fell off the left or bottom edge: nothing plausible remains, so
	// the target is absent — after at most m + n - 1 staircase steps.
	return false
}
