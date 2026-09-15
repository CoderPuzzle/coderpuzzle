// Battleships are straight horizontal or vertical runs of 'X', and no two
// ships touch, so each ship has exactly one cell with no 'X' above it and
// no 'X' to its left: its head, the first of its cells in reading order.
// Counting heads counts ships.
func countBattleships(board [][]string) int {
	m := len(board)
	n := len(board[0])
	count := 0
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if board[i][j] != "X" {
				continue
			}
			if i > 0 && board[i-1][j] == "X" {
				continue
			}
			if j > 0 && board[i][j-1] == "X" {
				continue
			}
			count++
		}
	}
	return count
}
