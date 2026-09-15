func hitBricks(grid [][]int, hits [][]int) []int {
	m, n := len(grid), len(grid[0])
	top := m * n
	parent := make([]int, top+1)
	for i := range parent {
		parent[i] = i
	}
	size := make([]int, top+1)
	for i := range size {
		size[i] = 1
	}
	size[top] = 0

	var find func(int) int
	find = func(x int) int {
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}
	union := func(a, b int) {
		ra, rb := find(a), find(b)
		if ra == rb {
			return
		}
		if size[ra] < size[rb] {
			ra, rb = rb, ra
		}
		parent[rb] = ra
		size[ra] += size[rb]
	}
	idx := func(r, c int) int { return r*n + c }

	// Final grid after all hits are applied.
	g := make([][]int, m)
	for r := range grid {
		g[r] = append([]int(nil), grid[r]...)
	}
	for _, hit := range hits {
		g[hit[0]][hit[1]] = 0
	}

	dirs := [4][2]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

	// Union all remaining bricks with each other and with the virtual top.
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			if g[r][c] == 1 {
				if r == 0 {
					union(idx(r, c), top)
				}
				if r+1 < m && g[r+1][c] == 1 {
					union(idx(r, c), idx(r+1, c))
				}
				if c+1 < n && g[r][c+1] == 1 {
					union(idx(r, c), idx(r, c+1))
				}
			}
		}
	}

	res := make([]int, len(hits))
	for k := len(hits) - 1; k >= 0; k-- {
		r, c := hits[k][0], hits[k][1]
		if grid[r][c] != 1 {
			continue
		}
		before := size[find(top)]
		g[r][c] = 1
		if r == 0 {
			union(idx(r, c), top)
		}
		for _, d := range dirs {
			nr, nc := r+d[0], c+d[1]
			if 0 <= nr && nr < m && 0 <= nc && nc < n && g[nr][nc] == 1 {
				union(idx(r, c), idx(nr, nc))
			}
		}
		after := size[find(top)]
		diff := after - before - 1
		if diff < 0 {
			diff = 0
		}
		res[k] = diff
	}
	return res
}
