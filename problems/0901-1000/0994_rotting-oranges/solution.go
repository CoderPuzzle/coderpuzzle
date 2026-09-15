func orangesRotting(grid [][]int) int {
	rows := len(grid)
	cols := len(grid[0])
	g := make([][]int, rows)
	for r := range grid {
		g[r] = append([]int(nil), grid[r]...)
	}
	type cell struct{ r, c, t int }
	queue := make([]cell, 0)
	fresh := 0
	// Multi-source BFS: every rotten orange starts at t = 0; the answer
	// is the time the last fresh orange rots. Count fresh cells so
	// walled-off stragglers can be detected at the end.
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if g[r][c] == 2 {
				queue = append(queue, cell{r, c, 0})
			} else if g[r][c] == 1 {
				fresh++
			}
		}
	}
	minutes := 0
	head := 0
	dr := [4]int{1, -1, 0, 0}
	dc := [4]int{0, 0, 1, -1}
	for head < len(queue) {
		cur := queue[head]
		head++
		// Tracking the max infection time spares per-minute batching.
		if cur.t > minutes {
			minutes = cur.t
		}
		for d := 0; d < 4; d++ {
			nr, nc := cur.r+dr[d], cur.c+dc[d]
			if nr >= 0 && nr < rows && nc >= 0 && nc < cols && g[nr][nc] == 1 {
				// Flip to rotten on enqueue: each cell queues at most
				// once and `fresh` stays in sync with the grid.
				g[nr][nc] = 2
				fresh--
				queue = append(queue, cell{nr, nc, cur.t + 1})
			}
		}
	}
	if fresh == 0 {
		return minutes
	}
	return -1
}
