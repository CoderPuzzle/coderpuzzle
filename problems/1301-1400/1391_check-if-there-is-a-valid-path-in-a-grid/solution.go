func hasValidPath(grid [][]int) bool {
	// Each street type is the set of sides it opens. A move between
	// neighbouring cells is legal only when the source opens the shared
	// side AND the target opens the opposite side, so a plain BFS from
	// (0,0) over those mutual connections decides reachability.
	streetSides := map[int][]int{
		1: {0, 1}, 2: {2, 3}, 3: {0, 3}, 4: {1, 3}, 5: {0, 2}, 6: {1, 2},
	}
	step := [4][2]int{{0, -1}, {0, 1}, {-1, 0}, {1, 0}}
	opposite := [4]int{1, 0, 3, 2}
	m, n := len(grid), len(grid[0])
	visited := make([][]bool, m)
	for row := range visited {
		visited[row] = make([]bool, n)
	}
	queue := [][]int{{0, 0}}
	visited[0][0] = true
	for len(queue) > 0 {
		cell := queue[0]
		queue = queue[1:]
		row, col := cell[0], cell[1]
		if row == m-1 && col == n-1 {
			return true
		}
		for _, side := range streetSides[grid[row][col]] {
			nr, nc := row+step[side][0], col+step[side][1]
			if nr < 0 || nr >= m || nc < 0 || nc >= n || visited[nr][nc] {
				continue
			}
			for _, targetSide := range streetSides[grid[nr][nc]] {
				if targetSide == opposite[side] {
					visited[nr][nc] = true
					queue = append(queue, []int{nr, nc})
					break
				}
			}
		}
	}
	return false
}
