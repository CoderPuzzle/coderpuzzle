// Probability-mass DP over the board. board[r][c] is the probability of
// standing on (r, c) after the moves made so far; one gather sweep advances
// it by one move, and mass addressed off the board is lost.
func knightProbability(n int, k int, row int, column int) float64 {
	moves := [8][2]int{{-2, -1}, {-2, 1}, {-1, -2}, {-1, 2}, {1, -2}, {1, 2}, {2, -1}, {2, 1}}
	board := make([][]float64, n)
	for r := range board {
		board[r] = make([]float64, n)
	}
	board[row][column] = 1.0
	for step := 0; step < k; step++ {
		next := make([][]float64, n)
		for r := range next {
			next[r] = make([]float64, n)
		}
		for r := 0; r < n; r++ {
			for c := 0; c < n; c++ {
				mass := 0.0
				for _, offset := range moves {
					nr, nc := r+offset[0], c+offset[1]
					if nr >= 0 && nr < n && nc >= 0 && nc < n {
						mass += board[nr][nc] / 8.0
					}
				}
				next[r][c] = mass
			}
		}
		board = next
	}
	total := 0.0
	for r := 0; r < n; r++ {
		for c := 0; c < n; c++ {
			total += board[r][c]
		}
	}
	return total
}
