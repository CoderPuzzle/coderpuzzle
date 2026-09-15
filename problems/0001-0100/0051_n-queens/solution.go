import "strings"

func solveNQueens(n int) [][]string {
	results := [][]string{}
	cols := map[int]bool{}
	diag1 := map[int]bool{}
	diag2 := map[int]bool{}
	board := []string{}

	var backtrack func(row int)
	// One queen per row removes row conflicts by construction, so only
	// columns and diagonals need tracking while the board grows row by row.
	backtrack = func(row int) {
		// Every row holds a queen and no pair attacks: record a copy so later
		// backtracking cannot mutate this solution.
		if row == n {
			sol := make([]string, len(board))
			copy(sol, board)
			results = append(results, sol)
			return
		}
		for col := 0; col < n; col++ {
			// O(1) safety check: cols holds occupied columns, diag1 holds
			// row - col (constant along one diagonal family), diag2 holds
			// row + col (constant along the other). A candidate is safe
			// exactly when all three values are unseen.
			if cols[col] || diag1[row-col] || diag2[row+col] {
				continue
			}
			cols[col] = true
			diag1[row-col] = true
			diag2[row+col] = true
			rowStr := strings.Repeat(".", col) + "Q" + strings.Repeat(".", n-col-1)
			board = append(board, rowStr)
			backtrack(row + 1)
			// Undo the placement, restoring state for the next candidate.
			board = board[:len(board)-1]
			delete(cols, col)
			delete(diag1, row-col)
			delete(diag2, row+col)
		}
	}

	backtrack(0)
	return results
}
