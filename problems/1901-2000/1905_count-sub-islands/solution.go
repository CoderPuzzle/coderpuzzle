func countSubIslands(grid1 [][]int, grid2 [][]int) int {
	m, n := len(grid2), len(grid2[0])
	seen := make([][]bool, m)
	for i := range seen {
		seen[i] = make([]bool, n)
	}
	count := 0
	for si := 0; si < m; si++ {
		for sj := 0; sj < n; sj++ {
			// An unseen grid2 land cell starts a fresh island: it is a sub-island
			// iff EVERY one of its cells is also land in grid1 — no island
			// matching between the grids is needed.
			if grid2[si][sj] == 1 && !seen[si][sj] {
				seen[si][sj] = true
				// Explicit stack (not recursion): 500x500 grids would overflow it.
				stack := [][2]int{{si, sj}}
				isSub := true
				for len(stack) > 0 {
					top := stack[len(stack)-1]
					stack = stack[:len(stack)-1]
					x, y := top[0], top[1]
					// One water cell in grid1 disqualifies the whole island
					// (the flag is only read after the fill completes).
					if grid1[x][y] != 1 {
						isSub = false
					}
					for _, d := range [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
						nx, ny := x+d[0], y+d[1]
						if nx >= 0 && nx < m && ny >= 0 && ny < n && grid2[nx][ny] == 1 && !seen[nx][ny] {
							// Mark at push time so no cell is ever enqueued twice.
							seen[nx][ny] = true
							stack = append(stack, [2]int{nx, ny})
						}
					}
				}
				if isSub {
					count++
				}
			}
		}
	}
	return count
}
