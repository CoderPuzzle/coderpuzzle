func minFlips(mat [][]int) int {
	// Pack the matrix into one integer; flipping cell i XORs the state with
	// its cross-shaped flip mask. Order never matters and flipping a cell
	// twice cancels, so the reachable states form one graph per start state
	// and BFS over it gives the minimum step count.
	m, n := len(mat), len(mat[0])
	start := 0
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			if mat[r][c] == 1 {
				start |= 1 << (r*n + c)
			}
		}
	}
	if start == 0 {
		return 0
	}
	masks := make([]int, m*n)
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			mask := 1 << (r*n + c)
			for _, d := range [4][2]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}} {
				nr, nc := r+d[0], c+d[1]
				if nr >= 0 && nr < m && nc >= 0 && nc < n {
					mask |= 1 << (nr*n + nc)
				}
			}
			masks[r*n+c] = mask
		}
	}
	seen := make([]bool, 1<<(m*n))
	frontier := []int{start}
	seen[start] = true
	steps := 0
	for len(frontier) > 0 {
		steps++
		next := []int{}
		for _, state := range frontier {
			for _, mask := range masks {
				nstate := state ^ mask
				if nstate == 0 {
					return steps
				}
				if !seen[nstate] {
					seen[nstate] = true
					next = append(next, nstate)
				}
			}
		}
		frontier = next
	}
	return -1
}
