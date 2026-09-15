func largest1BorderedSquare(grid [][]int) int {
	rows, cols := len(grid), len(grid[0])
	// prefix[i][j] = sum of the grid rectangle [0..i) x [0..j)
	prefix := make([][]int, rows+1)
	for i := range prefix {
		prefix[i] = make([]int, cols+1)
	}
	for i := 0; i < rows; i++ {
		for j := 0; j < cols; j++ {
			prefix[i+1][j+1] = grid[i][j] + prefix[i][j+1] + prefix[i+1][j] - prefix[i][j]
		}
	}
	rect := func(r1, c1, r2, c2 int) int {
		return prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1]
	}
	best := 0
	for r1 := 0; r1 < rows; r1++ {
		for c1 := 0; c1 < cols; c1++ {
			limit := min(rows-r1, cols-c1)
			for side := 1; side <= limit; side++ {
				r2, c2 := r1+side-1, c1+side-1
				// Each edge is solid iff its cell sum equals its length.
				if rect(r1, c1, r1, c2) == side && rect(r2, c1, r2, c2) == side &&
					rect(r1, c1, r2, c1) == side && rect(r1, c2, r2, c2) == side {
					if side*side > best {
						best = side * side
					}
				}
			}
		}
	}
	return best
}
