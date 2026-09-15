func tilingRectangle(n int, m int) int {
	// Height of each column: the first column whose top is lowest names
	// the next uncovered cell, so the board state is just m heights.
	heights := make([]int, m)
	best := n * m // the all-1x1 tiling is always available

	findHole := func() int {
		column := 0
		for c := 1; c < m; c++ {
			if heights[c] < heights[column] {
				column = c
			}
		}
		return column
	}

	canPlace := func(column, side int) bool {
		for c := column; c < column+side; c++ {
			if heights[c] != heights[column] {
				return false
			}
		}
		return true
	}

	var backtrack func(count int)
	backtrack = func(count int) {
		if count >= best {
			return
		}
		column := findHole()
		if heights[column] == n {
			best = count // every column full
			return
		}
		// Largest side first: finds a strong incumbent early.
		maxSide := n - heights[column]
		if m-column < maxSide {
			maxSide = m - column
		}
		for side := maxSide; side >= 1; side-- {
			if !canPlace(column, side) {
				continue
			}
			for c := column; c < column+side; c++ {
				heights[c] += side
			}
			backtrack(count + 1)
			for c := column; c < column+side; c++ {
				heights[c] -= side
			}
		}
	}

	backtrack(0)
	return best
}
