func specialGrid(n int) [][]int {
	// Bottom-up quadrant doubling. A special grid of level k is, in
	// reading order of the conditions, TL = 3·4^(k-1) + G(k-1) on the left
	// of the top half, TR = G(k-1) on the right, BL and BR follow in the
	// bottom half — so each step rebuilds every row of G(k-1) into one
	// top-half row and one bottom-half row, the top halves grouped before
	// the bottom halves.
	grid := [][]int{{0}}
	step := 1
	for level := 0; level < n; level++ {
		rows := len(grid)
		half := len(grid[0])
		next := make([][]int, 2*rows)
		for index := range next {
			next[index] = make([]int, 2*half)
		}
		for index := 0; index < rows; index++ {
			for c := 0; c < half; c++ {
				next[index][c] = grid[index][c] + 3*step
				next[index][c+half] = grid[index][c]
				next[rows+index][c] = grid[index][c] + 2*step
				next[rows+index][c+half] = grid[index][c] + step
			}
		}
		grid = next
		step *= 4
	}
	return grid
}
