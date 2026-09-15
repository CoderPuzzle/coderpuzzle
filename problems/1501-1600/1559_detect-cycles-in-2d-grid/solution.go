func containsCycle(grid [][]string) bool {
	rows := len(grid)
	cols := len(grid[0])
	visited := make([][]bool, rows)
	for i := range visited {
		visited[i] = make([]bool, cols)
	}
	dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	for r0 := 0; r0 < rows; r0++ {
		for c0 := 0; c0 < cols; c0++ {
			if visited[r0][c0] {
				continue
			}
			visited[r0][c0] = true
			stack := [][4]int{{r0, c0, -1, -1}}
			for len(stack) > 0 {
				top := stack[len(stack)-1]
				stack = stack[:len(stack)-1]
				x, y, px, py := top[0], top[1], top[2], top[3]
				for _, d := range dirs {
					nx, ny := x+d[0], y+d[1]
					if nx < 0 || nx >= rows || ny < 0 || ny >= cols {
						continue
					}
					if grid[nx][ny] != grid[x][y] {
						continue
					}
					if nx == px && ny == py {
						continue
					}
					if visited[nx][ny] {
						return true
					}
					visited[nx][ny] = true
					stack = append(stack, [4]int{nx, ny, x, y})
				}
			}
		}
	}
	return false
}
