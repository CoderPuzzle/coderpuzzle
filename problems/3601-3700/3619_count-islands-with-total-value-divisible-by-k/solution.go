func countIslands(grid [][]int, k int) int {
	m, n := len(grid), len(grid[0])
	seen := make([][]bool, m)
	for i := range seen {
		seen[i] = make([]bool, n)
	}
	// Iterative BFS: an island can span all 1e5 cells, so no recursion.
	// One shared queue buffer; each island's flood fill starts over.
	queue := make([]int, 0, m*n)
	dirs := [4][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	count := 0
	for si := 0; si < m; si++ {
		for sj := 0; sj < n; sj++ {
			if grid[si][sj] == 0 || seen[si][sj] {
				continue
			}
			// An island total reaches 1e5 cells * 1e6 = 1e11, past the
			// int32 range, so the sum accumulates in an int64.
			total := int64(0)
			queue = queue[:0]
			queue = append(queue, si*n+sj)
			seen[si][sj] = true
			for head := 0; head < len(queue); head++ {
				cell := queue[head]
				x, y := cell/n, cell%n
				total += int64(grid[x][y])
				for _, d := range dirs {
					nx, ny := x+d[0], y+d[1]
					if nx < 0 || nx >= m || ny < 0 || ny >= n {
						continue
					}
					if grid[nx][ny] == 0 || seen[nx][ny] {
						continue
					}
					seen[nx][ny] = true
					queue = append(queue, nx*n+ny)
				}
			}
			if total%int64(k) == 0 {
				count++
			}
		}
	}
	return count
}
