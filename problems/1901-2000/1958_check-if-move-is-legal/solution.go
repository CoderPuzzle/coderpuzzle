// Walk the eight directions from the move cell: a legal move needs a run of
// the opposite color ending in a cell of the move's color.
func checkMove(board [][]string, rMove int, cMove int, color string) bool {
	opposite := "B"
	if color == "B" {
		opposite = "W"
	}
	dr := []int{-1, -1, -1, 0, 0, 1, 1, 1}
	dc := []int{-1, 0, 1, -1, 1, -1, 0, 1}
	for d := 0; d < 8; d++ {
		r := rMove + dr[d]
		c := cMove + dc[d]
		if r < 0 || r >= 8 || c < 0 || c >= 8 || board[r][c] != opposite {
			continue
		}
		r += dr[d]
		c += dc[d]
		for r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] == opposite {
			r += dr[d]
			c += dc[d]
		}
		if r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] == color {
			return true
		}
	}
	return false
}
