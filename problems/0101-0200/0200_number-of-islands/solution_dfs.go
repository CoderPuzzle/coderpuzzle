func numIslands(grid [][]string) int {
	rows := len(grid)
	if rows == 0 {
		return 0
	}
	cols := len(grid[0])
	visited := make([][]bool, rows)
	for i := range visited {
		visited[i] = make([]bool, cols)
	}
	count := 0
	dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] == "1" && !visited[r][c] {
				count++
				stack := [][2]int{{r, c}}
				visited[r][c] = true
				for len(stack) > 0 {
					top := stack[len(stack)-1]
					stack = stack[:len(stack)-1]
					x, y := top[0], top[1]
					for _, d := range dirs {
						nx, ny := x+d[0], y+d[1]
						if nx >= 0 && nx < rows && ny >= 0 && ny < cols &&
							grid[nx][ny] == "1" && !visited[nx][ny] {
							visited[nx][ny] = true
							stack = append(stack, [2]int{nx, ny})
						}
					}
				}
			}
		}
	}
	return count
}
