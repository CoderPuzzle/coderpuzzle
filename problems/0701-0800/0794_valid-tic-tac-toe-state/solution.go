import "strings"

// Reachability folds into three facts about the final position. X moves
// first and play strictly alternates, so the counts must satisfy
// x == o or x == o + 1. The game stops at the first completed line, so
// at most one player holds a winning row, column, or diagonal — and the
// winner's decisive placement pins the tally exactly: X's winning move
// leaves x == o + 1, O's leaves x == o. A board passing all three gates
// was played; any other board is unreachable.
func validTicTacToe(board []string) bool {
	cells := strings.Join(board, "")
	x := strings.Count(cells, "X")
	o := strings.Count(cells, "O")
	if x != o && x != o+1 {
		return false
	}
	lines := [8][3]int{
		{0, 1, 2}, {3, 4, 5}, {6, 7, 8},
		{0, 3, 6}, {1, 4, 7}, {2, 5, 8},
		{0, 4, 8}, {2, 4, 6},
	}
	wins := func(player byte) bool {
		for _, line := range lines {
			if cells[line[0]] == player && cells[line[1]] == player && cells[line[2]] == player {
				return true
			}
		}
		return false
	}
	xwin := wins('X')
	owin := wins('O')
	if xwin && owin {
		return false
	}
	if xwin && x != o+1 {
		return false
	}
	if owin && x != o {
		return false
	}
	return true
}
