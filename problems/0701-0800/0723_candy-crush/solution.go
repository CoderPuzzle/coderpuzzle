// One round: flag every candy inside a horizontal or vertical run of three
// or more equal values, empty the flagged cells, then let gravity settle
// every column. Both sweeps read the untouched board, so the flags land
// simultaneously — an L or T of one candy type loses all of its cells in a
// single round. Repeat until a round flags nothing; that board is stable.
func candyCrush(board [][]int) [][]int {
	rows, cols := len(board), len(board[0])
	for {
		marked := make([][]bool, rows)
		for row := range marked {
			marked[row] = make([]bool, cols)
		}
		crushed := false
		for i := 0; i < rows; i++ {
			for j := 0; j+2 < cols; j++ {
				value := board[i][j]
				if value != 0 && value == board[i][j+1] && value == board[i][j+2] {
					marked[i][j] = true
					marked[i][j+1] = true
					marked[i][j+2] = true
					crushed = true
				}
			}
		}
		for j := 0; j < cols; j++ {
			for i := 0; i+2 < rows; i++ {
				value := board[i][j]
				if value != 0 && value == board[i+1][j] && value == board[i+2][j] {
					marked[i][j] = true
					marked[i+1][j] = true
					marked[i+2][j] = true
					crushed = true
				}
			}
		}
		if !crushed {
			return board
		}
		for i := 0; i < rows; i++ {
			for j := 0; j < cols; j++ {
				if marked[i][j] {
					board[i][j] = 0
				}
			}
		}
		// Gravity: each column compacts downward in place — candies fall
		// past the holes, holes bubble to the top.
		for j := 0; j < cols; j++ {
			write := rows - 1
			for i := rows - 1; i >= 0; i-- {
				if board[i][j] != 0 {
					board[write][j] = board[i][j]
					write--
				}
			}
			for i := write; i >= 0; i-- {
				board[i][j] = 0
			}
		}
	}
}
