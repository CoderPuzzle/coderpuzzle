func longestIncreasingPath(matrix [][]int) int {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return 0
	}
	m, n := len(matrix), len(matrix[0])
	// memo[i][j] = longest ascending walk starting at (i, j); 0 means
	// "not computed yet".
	memo := make([][]int, m)
	for i := range memo {
		memo[i] = make([]int, n)
	}
	di := [4]int{1, -1, 0, 0}
	dj := [4]int{0, 0, 1, -1}
	best := 0
	// The DFS call stack, made explicit: each frame is the cell plus the
	// next direction to try. A frame pops once all four directions have
	// been explored.
	type frame struct{ i, j, k int }
	for si := 0; si < m; si++ {
		for sj := 0; sj < n; sj++ {
			if memo[si][sj] != 0 {
				continue
			}
			stack := []frame{{si, sj, 0}}
			for len(stack) > 0 {
				top := &stack[len(stack)-1]
				i, j, k := top.i, top.j, top.k
				if k == 0 {
					// First visit: the cell on its own is a walk of 1.
					memo[i][j] = 1
				}
				if k == 4 {
					// Every larger neighbour has been absorbed, so the
					// frame's value is final: report it and hand it to
					// the frame below (the cell that descended here).
					stack = stack[:len(stack)-1]
					if memo[i][j] > best {
						best = memo[i][j]
					}
					if len(stack) > 0 {
						parent := &stack[len(stack)-1]
						if memo[i][j]+1 > memo[parent.i][parent.j] {
							memo[parent.i][parent.j] = memo[i][j] + 1
						}
					}
					continue
				}
				ni, nj := i+di[k], j+dj[k]
				top.k++
				// Only strictly larger neighbours continue the walk.
				if ni >= 0 && ni < m && nj >= 0 && nj < n && matrix[ni][nj] > matrix[i][j] {
					if memo[ni][nj] == 0 {
						stack = append(stack, frame{ni, nj, 0})
					} else {
						// Finished earlier — its memo is final already.
						if memo[ni][nj]+1 > memo[i][j] {
							memo[i][j] = memo[ni][nj] + 1
						}
					}
				}
			}
		}
	}
	return best
}
