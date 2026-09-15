func firstCompleteIndex(arr []int, mat [][]int) int {
	// Precompute where every value lives, then replay arr bumping each
	// cell's row and column counter; a counter reaching its width or height
	// means that line just finished painting.
	rows, columns := len(mat), len(mat[0])
	rowOf := make([]int, rows*columns+1)
	columnOf := make([]int, rows*columns+1)
	for r := 0; r < rows; r++ {
		for c := 0; c < columns; c++ {
			rowOf[mat[r][c]] = r
			columnOf[mat[r][c]] = c
		}
	}
	rowFill := make([]int, rows)
	columnFill := make([]int, columns)
	for index, value := range arr {
		if rowFill[rowOf[value]]++; rowFill[rowOf[value]] == columns {
			return index
		}
		if columnFill[columnOf[value]]++; columnFill[columnOf[value]] == rows {
			return index
		}
	}
	return -1
}
