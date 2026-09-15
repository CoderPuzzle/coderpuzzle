func exist(board [][]string, word string) bool {
	rows, cols := len(board), len(board[0])
	last := len(word) - 1
	var walk func(row, col, index int) bool
	walk = func(row, col, index int) bool {
		// The cell must supply this letter; the last letter completes the word.
		if board[row][col] != string(word[index]) {
			return false
		}
		if index == last {
			return true
		}
		// The board doubles as the visited set: overwrite the cell with a
		// marker no letter can equal, so deeper levels cannot step on it.
		letter := board[row][col]
		board[row][col] = "#"
		found := false
		for _, step := range [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
			nextRow, nextCol := row+step[0], col+step[1]
			if nextRow >= 0 && nextRow < rows && nextCol >= 0 && nextCol < cols && walk(nextRow, nextCol, index+1) {
				found = true
				break
			}
		}
		// Restore on the way out: sibling starts and later cases see the board intact.
		board[row][col] = letter
		return found
	}
	for row := 0; row < rows; row++ {
		for col := 0; col < cols; col++ {
			if walk(row, col, 0) {
				return true
			}
		}
	}
	return false
}
