func totalNQueens(n int) int {
	// One queen per row means rows can never clash; marks for the column
	// and the two diagonal families make "attacked?" a constant-time check.
	columns := make([]bool, n)
	diagonals := make([]bool, 2*n-1)
	antiDiagonals := make([]bool, 2*n-1)
	var walk func(row int) int
	walk = func(row int) int {
		// Every row has a queen: one complete, conflict-free placement.
		if row == n {
			return 1
		}
		count := 0
		for column := 0; column < n; column++ {
			// r - c is constant along a main diagonal (shifted up by n - 1
			// to stay a valid index), r + c along an anti-diagonal.
			diagonal := row + n - 1 - column
			antiDiagonal := row + column
			if columns[column] || diagonals[diagonal] || antiDiagonals[antiDiagonal] {
				continue
			}
			columns[column], diagonals[diagonal], antiDiagonals[antiDiagonal] = true, true, true
			count += walk(row + 1)
			// Undo the marks so sibling branches start from the same board.
			columns[column], diagonals[diagonal], antiDiagonals[antiDiagonal] = false, false, false
		}
		return count
	}
	return walk(0)
}
