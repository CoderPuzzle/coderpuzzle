func latestDayToCross(row int, col int, cells [][]int) int {
	n := row * col
	top, bottom := n, n+1 // virtual sentinels: one node per shore
	parent := make([]int, n+2)
	size := make([]int, n+2)
	for i := range parent {
		parent[i] = i
		size[i] = 1
	}
	active := make([][]bool, row)
	for r := range active {
		active[r] = make([]bool, col)
	}
	find := func(x int) int {
		// Path halving keeps the trees flat without a second pass.
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}
	union := func(a int, b int) {
		rootA, rootB := find(a), find(b)
		if rootA == rootB {
			return
		}
		// Union by size: hang the smaller tree under the larger.
		if size[rootA] < size[rootB] {
			rootA, rootB = rootB, rootA
		}
		parent[rootB] = rootA
		size[rootA] += size[rootB]
	}
	// Walk the days backwards: one cell of land reappears per step, so
	// connectivity only grows. After absorbing cells[i] the grid state is
	// exactly "day i" (cells[:i] still flooded), so the first moment the
	// shores share a root, day i is the last crossable day.
	drs := [4]int{1, -1, 0, 0}
	dcs := [4]int{0, 0, 1, -1}
	for i := n - 1; i >= 0; i-- {
		r, c := cells[i][0]-1, cells[i][1]-1
		active[r][c] = true
		land := r*col + c
		if r == 0 {
			union(land, top)
		}
		if r == row-1 {
			union(land, bottom)
		}
		for d := 0; d < 4; d++ {
			nr, nc := r+drs[d], c+dcs[d]
			if nr >= 0 && nr < row && nc >= 0 && nc < col && active[nr][nc] {
				union(land, nr*col+nc)
			}
		}
		if find(top) == find(bottom) {
			return i // the shores just met: no later day can cross
		}
	}
	return 0 // unreachable: with row, col >= 2 even day 1 always crosses
}
