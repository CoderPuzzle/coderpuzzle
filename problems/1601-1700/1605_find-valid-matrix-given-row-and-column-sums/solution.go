func restoreMatrix(rowSum []int, colSum []int) [][]int {
	rows, cols := len(rowSum), len(colSum)
	remainingRow := append([]int(nil), rowSum...)
	remainingCol := append([]int(nil), colSum...)
	matrix := make([][]int, rows)
	for i := range matrix {
		matrix[i] = make([]int, cols)
	}
	for i := 0; i < rows; i++ {
		for j := 0; j < cols; j++ {
			value := remainingRow[i]
			if remainingCol[j] < value {
				value = remainingCol[j]
			}
			matrix[i][j] = value
			remainingRow[i] -= value
			remainingCol[j] -= value
		}
	}
	return matrix
}
