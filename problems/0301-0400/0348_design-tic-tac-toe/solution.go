// One counter per line: rows/cols carry each player's mark count on every
// line, plus one counter per diagonal — a counter reaching n means the
// player owns the whole line, so no board is stored.
type TicTacToe struct {
	n            int
	rows         [][]int
	cols         [][]int
	diagonal     []int
	antiDiagonal []int
}

func NewTicTacToeTyped(n int) *TicTacToe {
	// Index 0 stays unused so the player ids 1 and 2 address their own
	// counter rows directly.
	game := &TicTacToe{
		n:            n,
		rows:         make([][]int, 3),
		cols:         make([][]int, 3),
		diagonal:     make([]int, 3),
		antiDiagonal: make([]int, 3),
	}
	for player := 0; player < 3; player++ {
		game.rows[player] = make([]int, n)
		game.cols[player] = make([]int, n)
	}
	return game
}

func (game *TicTacToe) move(row int, col int, player int) int {
	// Only the lines through the played square can complete on this
	// move, so the counters just bumped decide the winner.
	game.rows[player][row]++
	game.cols[player][col]++
	if row == col {
		game.diagonal[player]++
	}
	if row+col == game.n-1 {
		game.antiDiagonal[player]++
	}
	if game.rows[player][row] == game.n || game.cols[player][col] == game.n ||
		game.diagonal[player] == game.n || game.antiDiagonal[player] == game.n {
		return player
	}
	return 0
}
