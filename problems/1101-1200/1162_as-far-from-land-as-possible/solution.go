func maxDistance(grid [][]int) int {
	n := len(grid)
	// copy so the input is not mutated; the copy doubles as visited marks
	g := make([][]int, n)
	for i := range grid {
		g[i] = append([]int(nil), grid[i]...)
	}
	type cell struct{ i, j int }
	queue := []cell{}
	// multi-source BFS: every land cell starts at distance 0, so the first
	// wavefront arrival is exactly each cell's nearest-land distance
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if g[i][j] == 1 {
				queue = append(queue, cell{i, j})
			}
		}
	}
	// all water (empty seed) or all land: no distance exists
	if len(queue) == 0 || len(queue) == n*n {
		return -1
	}
	dist := 0
	head := 0
	for head < len(queue) {
		// expand one full level per round; dist counts levels processed
		dist++
		size := len(queue)
		for ; head < size; head++ {
			c := queue[head]
			// 4-directional steps match Manhattan distance on this grid
			for _, d := range [4]cell{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
				ni, nj := c.i+d.i, c.j+d.j
				if ni >= 0 && ni < n && nj >= 0 && nj < n && g[ni][nj] == 0 {
					// flip to 1 on enqueue: each cell is queued once
					g[ni][nj] = 1
					queue = append(queue, cell{ni, nj})
				}
			}
		}
	}
	// the last round absorbed nothing new, so the deepest level is dist-1
	return dist - 1
}
