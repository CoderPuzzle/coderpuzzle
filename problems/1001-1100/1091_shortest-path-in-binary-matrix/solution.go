func shortestPathBinaryMatrix(grid [][]int) int {
	n := len(grid)
	// Blocked corners admit no path; a 1x1 open grid needs no moves.
	if grid[0][0] != 0 || grid[n-1][n-1] != 0 {
		return -1
	}
	if n == 1 {
		return 1
	}
	// Unit-cost moves make BFS optimal: first arrival is a shortest path.
	// dist doubles as the visited marker; length counts cells, so start = 1.
	dist := make([][]int, n)
	for i := range dist {
		dist[i] = make([]int, n)
	}
	queue := make([][2]int, 0, n*n)
	queue = append(queue, [2]int{0, 0})
	dist[0][0] = 1
	for head := 0; head < len(queue); head++ {
		x, y := queue[head][0], queue[head][1]
		// Eight-directional neighborhood (diagonals included).
		for dx := -1; dx <= 1; dx++ {
			for dy := -1; dy <= 1; dy++ {
				if dx == 0 && dy == 0 {
					continue
				}
				nx, ny := x+dx, y+dy
				if nx >= 0 && nx < n && ny >= 0 && ny < n && grid[nx][ny] == 0 && dist[nx][ny] == 0 {
					// Early exit the moment the goal becomes reachable.
					if nx == n-1 && ny == n-1 {
						return dist[x][y] + 1
					}
					dist[nx][ny] = dist[x][y] + 1
					queue = append(queue, [2]int{nx, ny})
				}
			}
		}
	}
	// Queue drained without reaching the goal: no clear path.
	return -1
}
