func numRookCaptures(board [][]string) int {
	rookRow, rookCol := -1, -1
	for row := 0; row < 8; row++ {
		for col := 0; col < 8; col++ {
			if board[row][col] == "R" {
				rookRow, rookCol = row, col
			}
		}
	}

	captures := 0
	for _, direction := range [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
		row, col := rookRow+direction[0], rookCol+direction[1]
		// Walk while the path is still empty; stop at the first piece or the edge.
		for row >= 0 && row < 8 && col >= 0 && col < 8 && board[row][col] == "." {
			row += direction[0]
			col += direction[1]
		}
		if row >= 0 && row < 8 && col >= 0 && col < 8 && board[row][col] == "p" {
			captures++
		}
	}
	return captures
}
