func placeWordInCrossword(board [][]string, word string) bool {
	rows, columns := len(board), len(board[0])
	matches := func(row, column, rowStep, columnStep, length int) bool {
		if length != len(word) {
			return false
		}
		forward, backward := true, true
		for offset := 0; offset < length; offset++ {
			cell := board[row+rowStep*offset][column+columnStep*offset][0]
			if cell != ' ' {
				forward = forward && cell == word[offset]
				backward = backward && cell == word[length-1-offset]
			}
		}
		return forward || backward
	}

	for row := 0; row < rows; row++ {
		start := 0
		for end := 0; end <= columns; end++ {
			if end == columns || board[row][end] == "#" {
				if matches(row, start, 0, 1, end-start) {
					return true
				}
				start = end + 1
			}
		}
	}

	for column := 0; column < columns; column++ {
		start := 0
		for end := 0; end <= rows; end++ {
			if end == rows || board[end][column] == "#" {
				if matches(start, column, 1, 0, end-start) {
					return true
				}
				start = end + 1
			}
		}
	}

	return false
}
