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
				queue := [][2]int{{r, c}}
				visited[r][c] = true
				for head := 0; head < len(queue); head++ {
					x, y := queue[head][0], queue[head][1]
					for _, d := range dirs {
						nx, ny := x+d[0], y+d[1]
						if nx >= 0 && nx < rows && ny >= 0 && ny < cols &&
							grid[nx][ny] == "1" && !visited[nx][ny] {
							visited[nx][ny] = true
							queue = append(queue, [2]int{nx, ny})
						}
					}
				}
			}
		}
	}
	return count
}
