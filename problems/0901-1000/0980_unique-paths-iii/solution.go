// A qualifying walk steps on every non-obstacle square exactly once and
// reaches the ending square last — a Hamiltonian path of the walkable
// squares, counted by walking every candidate. m * n is at most 20, so one
// integer is the visited set: bit r*n + c. The scan finds the start and
// builds `full`, the mask of every walkable square; a walk counts exactly
// when it steps onto the ending square with mask == full.
func uniquePathsIII(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	full := 0
	startR, startC := 0, 0
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if grid[i][j] != -1 {
				full |= 1 << (i*n + j)
			}
			if grid[i][j] == 1 {
				startR, startC = i, j
			}
		}
	}
	walks := 0
	// No square may be walked twice, so meeting the ending square ends the
	// walk whether or not it is complete.
	var dfs func(r, c, mask int)
	dfs = func(r, c, mask int) {
		if grid[r][c] == 2 {
			if mask == full {
				walks++
			}
			return
		}
		for _, step := range [4][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}} {
			nr, nc := r+step[0], c+step[1]
			if nr < 0 || nr >= m || nc < 0 || nc >= n || grid[nr][nc] == -1 {
				continue
			}
			bit := 1 << (nr*n + nc)
			if mask&bit == 0 {
				dfs(nr, nc, mask|bit)
			}
		}
	}
	dfs(startR, startC, 1<<(startR*n+startC))
	return walks
}
