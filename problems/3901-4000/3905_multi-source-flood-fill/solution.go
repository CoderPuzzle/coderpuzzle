func colorGrid(n int, m int, sources [][]int) [][]int {
	grid := make([][]int, n)
	dist := make([][]int, n)
	for i := range grid {
		grid[i] = make([]int, m)
		dist[i] = make([]int, m)
		for j := range dist[i] {
			dist[i][j] = -1
		}
	}
	type cell struct{ r, c int }
	queue := make([]cell, 0, n*m)
	for _, s := range sources {
		r, c, color := s[0], s[1], s[2]
		grid[r][c] = color
		dist[r][c] = 0
		queue = append(queue, cell{r, c})
	}
	dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	for head := 0; head < len(queue); head++ {
		i, j := queue[head].r, queue[head].c
		d := dist[i][j]
		for _, dir := range dirs {
			ni, nj := i+dir[0], j+dir[1]
			if ni >= 0 && ni < n && nj >= 0 && nj < m {
				if dist[ni][nj] == -1 {
					dist[ni][nj] = d + 1
					grid[ni][nj] = grid[i][j]
					queue = append(queue, cell{ni, nj})
				} else if dist[ni][nj] == d+1 {
					// reached at the same time step by another color
					if grid[i][j] > grid[ni][nj] {
						grid[ni][nj] = grid[i][j]
					}
				}
			}
		}
	}
	return grid
}
