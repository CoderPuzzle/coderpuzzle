func shortestPath(grid [][]int, k int) int {
	m, n := len(grid), len(grid[0])
	if k >= m+n-2 {
		return m + n - 2
	}
	seen := make([][][]bool, m)
	for i := range seen {
		seen[i] = make([][]bool, n)
		for j := range seen[i] {
			seen[i][j] = make([]bool, k+1)
		}
	}
	type state struct{ x, y, rem int }
	queue := []state{{0, 0, k}}
	seen[0][0][k] = true
	steps := 0
	dirs := [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
	for len(queue) > 0 {
		next := []state{}
		for _, s := range queue {
			if s.x == m-1 && s.y == n-1 {
				return steps
			}
			for _, d := range dirs {
				nx, ny := s.x+d[0], s.y+d[1]
				if nx >= 0 && nx < m && ny >= 0 && ny < n {
					nr := s.rem - grid[nx][ny]
					if nr >= 0 && !seen[nx][ny][nr] {
						seen[nx][ny][nr] = true
						next = append(next, state{nx, ny, nr})
					}
				}
			}
		}
		queue = next
		steps++
	}
	return -1
}
