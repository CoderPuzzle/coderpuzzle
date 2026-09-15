func numSubmat(mat [][]int) int {
	m := len(mat)
	n := 0
	if m > 0 {
		n = len(mat[0])
	}
	total := 0
	// height[c]: run of consecutive ones ending at the current row in
	// column c — extended by a one, reset to zero by a zero.
	height := make([]int, n)
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			if mat[r][c] == 1 {
				height[c]++
			} else {
				height[c] = 0
			}
		}
		// Anchor submatrices at their bottom row: a span [left, right]
		// admits exactly min(height) of them (every height up to the
		// minimum works), and each submatrix has a unique bottom row and
		// span, so nothing is double-counted.
		for left := 0; left < n; left++ {
			minH := height[left]
			// Widening the span can only lower the minimum, so one
			// running variable tracks it.
			for right := left; right < n; right++ {
				if height[right] < minH {
					minH = height[right]
				}
				total += minH
			}
		}
	}
	return total
}
