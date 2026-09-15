func nearestExit(maze [][]string, entrance []int) int {
	m, n := len(maze), len(maze[0])
	er, ec := entrance[0], entrance[1]
	// Every move costs one step, so plain BFS from the entrance visits cells
	// in order of increasing distance; dist doubles as the visited set (-1).
	dist := make([][]int, m)
	for i := range dist {
		dist[i] = make([]int, n)
		for j := range dist[i] {
			dist[i][j] = -1
		}
	}
	dist[er][ec] = 0
	q := [][2]int{{er, ec}}
	for head := 0; head < len(q); head++ { // head index = queue front, no pops needed
		i, j := q[head][0], q[head][1]
		// Test on pop, not push: cleanly skips the entrance itself while
		// returning the correct distance for any other border cell.
		if (i == 0 || i == m-1 || j == 0 || j == n-1) && !(i == er && j == ec) {
			return dist[i][j]
		}
		for _, d := range [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
			ni, nj := i+d[0], j+d[1]
			if ni >= 0 && ni < m && nj >= 0 && nj < n && maze[ni][nj] == "." && dist[ni][nj] == -1 {
				// Assigning distance at enqueue time keeps the queue ordered
				// by distance.
				dist[ni][nj] = dist[i][j] + 1
				q = append(q, [2]int{ni, nj})
			}
		}
	}
	// Queue drained without dequeuing any exit: no reachable exit exists.
	return -1
}
