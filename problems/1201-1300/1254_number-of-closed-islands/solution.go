func closedIsland(grid [][]int) int {
	rows, cols := len(grid), len(grid[0])
	dr := []int{1, -1, 0, 0}
	dc := []int{0, 0, 1, -1}

	flood := func(r, c int) bool {
		// Erase land to water as we walk: the fill doubles as the visited
		// marker, and an explicit stack keeps snake-shaped islands from
		// overflowing the recursion stack.
		grid[r][c] = 1
		stack := [][2]int{{r, c}}
		closed := true
		for len(stack) > 0 {
			cell := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			x, y := cell[0], cell[1]
			for d := 0; d < 4; d++ {
				nx, ny := x+dr[d], y+dc[d]
				if nx >= 0 && nx < rows && ny >= 0 && ny < cols {
					if grid[nx][ny] == 0 {
						grid[nx][ny] = 1
						stack = append(stack, [2]int{nx, ny})
					}
				} else {
					// A step off the grid means the component touches
					// the border, so the whole island is not closed.
					closed = false
				}
			}
		}
		return closed
	}

	// Each surviving land cell seeds exactly one fill; a fill that never
	// stepped off-grid means the island was surrounded entirely by water.
	count := 0
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == 0 {
				if flood(r, c) {
					count++
				}
			}
		}
	}
	return count
}
