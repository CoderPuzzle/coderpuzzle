func gameOfLife(board [][]int) [][]int {
	m := len(board)
	n := len(board[0])
	// Snapshot the current generation: every neighbor count must read the
	// old states even while the board itself is being overwritten.
	snapshot := make([][]int, m)
	for r := range board {
		snapshot[r] = append([]int(nil), board[r]...)
	}
	dirs := [8][2]int{{-1, -1}, {-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}, {1, 1}}
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			live := 0
			// Count live neighbors in the snapshot; cells outside the board
			// count as dead via the bounds check.
			for _, d := range dirs {
				nr, nc := r+d[0], c+d[1]
				if nr >= 0 && nr < m && nc >= 0 && nc < n && snapshot[nr][nc] == 1 {
					live++
				}
			}
			// Rules applied to the old state: live survives on 2 or 3,
			// dead is born on exactly 3, everything else dies/stays dead.
			if snapshot[r][c] == 1 {
				if live == 2 || live == 3 {
					board[r][c] = 1
				} else {
					board[r][c] = 0
				}
			} else {
				if live == 3 {
					board[r][c] = 1
				} else {
					board[r][c] = 0
				}
			}
		}
	}
	return board
}
