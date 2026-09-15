func updateMatrix(mat [][]int) [][]int {
	m := len(mat)
	n := len(mat[0])
	dist := make([][]int, m)
	for i := range dist {
		dist[i] = make([]int, n)
		for j := range dist[i] {
			dist[i][j] = -1
		}
	}
	type cell struct{ i, j int }
	queue := make([]cell, 0, m*n)
	// Reverse the question: every zero broadcasts at distance 0 and the
	// first wavefront to reach a cell arrives on a shortest path.
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if mat[i][j] == 0 {
				dist[i][j] = 0
				queue = append(queue, cell{i, j})
			}
		}
	}
	head := 0
	di := [4]int{1, -1, 0, 0}
	dj := [4]int{0, 0, 1, -1}
	for head < len(queue) {
		c := queue[head]
		head++
		for d := 0; d < 4; d++ {
			ni := c.i + di[d]
			nj := c.j + dj[d]
			if ni >= 0 && ni < m && nj >= 0 && nj < n && dist[ni][nj] == -1 {
				// An unset distance doubles as the visited check, and
				// assigning before enqueueing keeps each cell queued
				// exactly once; non-decreasing dequeue order makes the
				// first assignment final.
				dist[ni][nj] = dist[c.i][c.j] + 1
				queue = append(queue, cell{ni, nj})
			}
		}
	}
	return dist
}
