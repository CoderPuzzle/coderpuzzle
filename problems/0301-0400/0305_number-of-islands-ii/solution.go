func numIslands2(m int, n int, positions [][]int) []int {
	// Union-find over flattened cell ids r * n + c keeps the island count
	// incremental; no full grid rescan after each add-land.
	parent := make([]int, m*n)
	size := make([]int, m*n)
	land := make([]bool, m*n)
	for i := range parent {
		parent[i] = i
		size[i] = 1
	}
	var find func(int) int
	find = func(x int) int {
		// Path halving: splice x onto its grandparent, flattening chains.
		for parent[x] != x {
			parent[x] = parent[parent[x]]
			x = parent[x]
		}
		return x
	}
	count := 0
	answer := make([]int, 0, len(positions))
	dr := [4]int{1, -1, 0, 0}
	dc := [4]int{0, 0, 1, -1}
	for _, pos := range positions {
		r, c := pos[0], pos[1]
		cell := r*n + c
		// A repeated position changes nothing; re-emit the current count.
		if land[cell] {
			answer = append(answer, count)
			continue
		}
		// The new land starts as its own island before any merges.
		land[cell] = true
		count++
		for k := 0; k < 4; k++ {
			nr, nc := r+dr[k], c+dc[k]
			if nr < 0 || nr >= m || nc < 0 || nc >= n || !land[nr*n+nc] {
				continue
			}
			// Distinct roots mean two islands merge, losing one count; a
			// later neighbor of the same island re-finds the merged root,
			// so no extra decrement sneaks in.
			ra, rb := find(cell), find(nr*n+nc)
			if ra != rb {
				// Union by size: attach the smaller tree underneath.
				if size[ra] < size[rb] {
					ra, rb = rb, ra
				}
				parent[rb] = ra
				size[ra] += size[rb]
				count--
			}
		}
		answer = append(answer, count)
	}
	return answer
}
