func findRotation(mat [][]int, target [][]int) bool {
	// Try each of the four orientations. Clockwise rotation:
	// new[r][c] = old[n-1-c][r].
	n := len(mat)
	cur := mat
	for t := 0; t < 4; t++ {
		eq := true
		for r := 0; r < n && eq; r++ {
			for c := 0; c < n && eq; c++ {
				if cur[r][c] != target[r][c] {
					eq = false
				}
			}
		}
		if eq {
			return true
		}
		nxt := make([][]int, n)
		for r := 0; r < n; r++ {
			nxt[r] = make([]int, n)
			for c := 0; c < n; c++ {
				nxt[r][c] = cur[n-1-c][r]
			}
		}
		cur = nxt
	}
	return false
}
