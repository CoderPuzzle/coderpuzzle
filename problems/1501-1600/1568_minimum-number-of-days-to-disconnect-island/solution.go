func minDays(grid [][]int) int {
	rows := len(grid)
	cols := len(grid[0])

	islandCount := func() int {
		seen := make([][]bool, rows)
		for i := range seen {
			seen[i] = make([]bool, cols)
		}
		count := 0
		dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
		type cell struct{ r, c int }
		for r := 0; r < rows; r++ {
			for c := 0; c < cols; c++ {
				if grid[r][c] == 1 && !seen[r][c] {
					count++
					stack := []cell{{r, c}}
					seen[r][c] = true
					for len(stack) > 0 {
						cur := stack[len(stack)-1]
						stack = stack[:len(stack)-1]
						for _, d := range dirs {
							nr, nc := cur.r+d[0], cur.c+d[1]
							if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 && !seen[nr][nc] {
								seen[nr][nc] = true
								stack = append(stack, cell{nr, nc})
							}
						}
					}
				}
			}
		}
		return count
	}

	if islandCount() != 1 {
		return 0
	}

	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == 1 {
				grid[r][c] = 0
				disconnected := islandCount() != 1
				grid[r][c] = 1
				if disconnected {
					return 1
				}
			}
		}
	}

	return 2
}
