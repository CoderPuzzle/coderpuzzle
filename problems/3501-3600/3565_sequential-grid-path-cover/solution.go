func findPath(grid [][]int, k int) [][]int {
	// Backtrack over the walk, entering waypoint w only as the w-th
	// waypoint. Two prunes keep the 5x5 worst case instant: the remaining
	// cells must still balance by color (the walk strictly alternates
	// colors), and the unvisited region must stay connected.
	m, n := len(grid), len(grid[0])
	total := m * n
	visited := make([][]bool, m)
	for r := range visited {
		visited[r] = make([]bool, n)
	}
	remaining := [2]int{}
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			remaining[(r+c)%2]++
		}
	}
	path := make([][]int, total)
	for i := range path {
		path[i] = make([]int, 2)
	}
	deltas := [4][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	connected := func() bool {
		unvisitedCount, start := 0, -1
		for r := 0; r < m; r++ {
			for c := 0; c < n; c++ {
				if !visited[r][c] {
					unvisitedCount++
					start = r*n + c
				}
			}
		}
		if unvisitedCount == 0 {
			return true
		}
		seen := make([]bool, m*n)
		seen[start] = true
		stack := []int{start}
		reached := 0
		for len(stack) > 0 {
			flat := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			reached++
			r, c := flat/n, flat%n
			for _, delta := range deltas {
				nr, nc := r+delta[0], c+delta[1]
				if nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && !seen[nr*n+nc] {
					seen[nr*n+nc] = true
					stack = append(stack, nr*n+nc)
				}
			}
		}
		return reached == unvisitedCount
	}
	var dfs func(r, c, count, nxt int) bool
	dfs = func(r, c, count, nxt int) bool {
		value := grid[r][c]
		if value != 0 && value != nxt {
			return false
		}
		visited[r][c] = true
		path[count][0], path[count][1] = r, c
		if value == nxt {
			nxt++
		}
		count++
		color := (r + c) % 2
		remaining[color]--
		ok := false
		if count == total {
			ok = true
		} else {
			left := total - count
			// The rest of the walk alternates colors, starting on the
			// opposite color of the current cell.
			if remaining[1-color] == (left+1)/2 && remaining[color] == left/2 && connected() {
				for _, delta := range deltas {
					nr, nc := r+delta[0], c+delta[1]
					if nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && dfs(nr, nc, count, nxt) {
						ok = true
						break
					}
				}
			}
		}
		if !ok {
			visited[r][c] = false
		}
		remaining[color]++
		return ok
	}
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			if (grid[r][c] == 0 || grid[r][c] == 1) && dfs(r, c, 0, 1) {
				return path
			}
		}
	}
	return [][]int{}
}
