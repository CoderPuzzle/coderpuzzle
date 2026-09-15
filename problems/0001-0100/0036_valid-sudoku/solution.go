// One seen-set per row, column, and 3x3 box: insert each filled cell's digit
// into the three units it belongs to, and the first repeat anywhere is the
// answer.
func isValidSudoku(board [][]string) bool {
	rows := make([]map[string]bool, 9)
	columns := make([]map[string]bool, 9)
	boxes := make([]map[string]bool, 9)
	for i := 0; i < 9; i++ {
		rows[i] = make(map[string]bool)
		columns[i] = make(map[string]bool)
		boxes[i] = make(map[string]bool)
	}
	for r := 0; r < 9; r++ {
		for c := 0; c < 9; c++ {
			digit := board[r][c]
			if digit == "." {
				continue
			}
			// Rows and columns are chunked in threes, so this numbers
			// the 3x3 boxes 0 through 8.
			b := (r/3)*3 + c/3
			if rows[r][digit] || columns[c][digit] || boxes[b][digit] {
				return false
			}
			rows[r][digit] = true
			columns[c][digit] = true
			boxes[b][digit] = true
		}
	}
	return true
}
