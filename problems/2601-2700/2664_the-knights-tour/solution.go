import "sort"

func tourOfKnight(m int, n int, r int, c int) [][]int {
	board := make([][]int, m)
	for i := range board {
		board[i] = make([]int, n)
		for j := range board[i] {
			board[i][j] = -1
		}
	}
	moves := [8][2]int{{1, 2}, {2, 1}, {2, -1}, {1, -2}, {-1, -2}, {-2, -1}, {-2, 1}, {-1, 2}}
	onward := func(row int, col int) int {
		count := 0
		for _, move := range moves {
			nr, nc := row+move[0], col+move[1]
			if nr >= 0 && nr < m && nc >= 0 && nc < n && board[nr][nc] == -1 {
				count++
			}
		}
		return count
	}
	var walk func(row int, col int, order int) bool
	walk = func(row int, col int, order int) bool {
		if order == m*n {
			return true
		}
		type choice struct {
			count, row, col int
		}
		choices := []choice{}
		for _, move := range moves {
			nr, nc := row+move[0], col+move[1]
			if nr >= 0 && nr < m && nc >= 0 && nc < n && board[nr][nc] == -1 {
				choices = append(choices, choice{onward(nr, nc), nr, nc})
			}
		}
		sort.Slice(choices, func(i, j int) bool { return choices[i].count < choices[j].count })
		for _, next := range choices {
			board[next.row][next.col] = order
			if walk(next.row, next.col, order+1) {
				return true
			}
			board[next.row][next.col] = -1
		}
		return false
	}
	board[r][c] = 0
	walk(r, c, 1)
	return board
}
