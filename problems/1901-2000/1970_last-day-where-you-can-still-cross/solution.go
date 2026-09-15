func latestDayToCross(row int, col int, cells [][]int) int {
	canCross := func(floodedCount int) bool {
		// Rebuild the grid for this query day: mark the flooded cells as
		// water, then test a top-to-bottom walk by BFS.
		grid := make([][]int, row)
		for r := range grid {
			grid[r] = make([]int, col)
		}
		for i := 0; i < floodedCount; i++ {
			grid[cells[i][0]-1][cells[i][1]-1] = 1
		}
		queue := make([][2]int, 0, row*col)
		seen := make([][]bool, row)
		for r := range seen {
			seen[r] = make([]bool, col)
		}
		// Multi-source BFS: every unflooded top-row cell is a start.
		for c := 0; c < col; c++ {
			if grid[0][c] == 0 {
				queue = append(queue, [2]int{0, c})
				seen[0][c] = true
			}
		}
		head := 0
		drs := [4]int{1, -1, 0, 0}
		dcs := [4]int{0, 0, 1, -1}
		for head < len(queue) {
			r, c := queue[head][0], queue[head][1]
			head++
			if r == row-1 {
				return true // bottom reached: crossing still possible
			}
			for d := 0; d < 4; d++ {
				nr, nc := r+drs[d], c+dcs[d]
				if nr >= 0 && nr < row && nc >= 0 && nc < col && !seen[nr][nc] && grid[nr][nc] == 0 {
					seen[nr][nc] = true
					queue = append(queue, [2]int{nr, nc})
				}
			}
		}
		return false
	}
	// Land only floods, never dries, so crossable days form a prefix of
	// days: binary-search its right endpoint. Day 1 is always crossable.
	lo, hi := 1, row*col
	for lo < hi {
		mid := (lo + hi + 1) / 2 // upper mid: converge on last feasible day
		if canCross(mid) {
			lo = mid
		} else {
			hi = mid - 1
		}
	}
	return lo
}
