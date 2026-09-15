func gameOfLife(board [][]int) [][]int {
	m := len(board)
	n := len(board[0])
	dirs := [8][2]int{{-1, -1}, {-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}, {1, 1}}
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			live := 0
			for _, d := range dirs {
				nr, nc := r+d[0], c+d[1]
				if nr >= 0 && nr < m && nc >= 0 && nc < n && (board[nr][nc] == 1 || board[nr][nc] == 2) {
					live++
				}
			}
			if board[r][c] == 1 && (live < 2 || live > 3) {
				board[r][c] = 2 // live -> dead
			} else if board[r][c] == 0 && live == 3 {
				board[r][c] = 3 // dead -> live
			}
		}
	}
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			if board[r][c] == 1 || board[r][c] == 3 {
				board[r][c] = 1
			} else {
				board[r][c] = 0
			}
		}
	}
	return board
}
