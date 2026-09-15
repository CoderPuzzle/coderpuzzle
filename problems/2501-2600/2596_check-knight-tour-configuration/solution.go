func checkValidGrid(grid [][]int) bool {
	// The configuration is valid exactly when visit 0 sits at the
	// top-left cell and every pair of consecutive visits lands a
	// knight move apart. Map each visit number to its cell, then
	// verify the deltas pairwise with the arithmetic move test
	// (one step in one axis, two steps in the other).
	if grid[0][0] != 0 {
		return false
	}
	n := len(grid)
	type cell struct{ r, c int }
	pos := make([]cell, n*n)
	for r := range grid {
		for c := range grid[r] {
			pos[grid[r][c]] = cell{r: r, c: c}
		}
	}
	for step := 1; step < n*n; step++ {
		dr := pos[step].r - pos[step-1].r
		dc := pos[step].c - pos[step-1].c
		if dr < 0 {
			dr = -dr
		}
		if dc < 0 {
			dc = -dc
		}
		if (dr != 1 || dc != 2) && (dr != 2 || dc != 1) {
			return false
		}
	}
	return true
}
