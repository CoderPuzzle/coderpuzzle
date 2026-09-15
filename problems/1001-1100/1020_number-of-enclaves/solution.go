// Iterative BFS (explicit queue, not recursion) starting from every land
// cell already sitting on the boundary: that land can trivially walk off
// the grid, and so can every land cell it can reach.
func numEnclaves(grid [][]int) int {
	rows, cols := len(grid), len(grid[0])
	type cell struct{ r, c int }
	queue := make([]cell, 0, rows*cols)

	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			onBoundary := r == 0 || r == rows-1 || c == 0 || c == cols-1
			if onBoundary && grid[r][c] == 1 {
				queue = append(queue, cell{r, c})
				grid[r][c] = 0
			}
		}
	}

	directions := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	for len(queue) > 0 {
		cur := queue[0]
		queue = queue[1:]
		for _, direction := range directions {
			nr, nc := cur.r+direction[0], cur.c+direction[1]
			if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 {
				grid[nr][nc] = 0
				queue = append(queue, cell{nr, nc})
			}
		}
	}

	// Whatever land the fill never reached could never walk off the grid:
	// that's exactly the enclosed count.
	count := 0
	for _, row := range grid {
		for _, v := range row {
			count += v
		}
	}
	return count
}
