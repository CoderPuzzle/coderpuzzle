func matrixBlockSum(mat [][]int, k int) [][]int {
	m, n := len(mat), len(mat[0])
	// prefix[i+1][j+1] = sum of the rectangle (0,0)..(i,j); the extra zero
	// row and column remove all boundary special-casing.
	prefix := make([][]int, m+1)
	for i := range prefix {
		prefix[i] = make([]int, n+1)
	}
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			// Two-dimensional inclusion-exclusion: add above + left,
			// subtract the doubly-counted corner, add the cell.
			prefix[i+1][j+1] = prefix[i][j+1] + prefix[i+1][j] - prefix[i][j] + mat[i][j]
		}
	}
	answer := make([][]int, m)
	for i := 0; i < m; i++ {
		answer[i] = make([]int, n)
		for j := 0; j < n; j++ {
			// Clamp the (i-k..i+k) window to the grid and convert it to
			// the half-open [r1,r2) x [c1,c2) form the table supports —
			// border cells just query a smaller rectangle.
			r1, r2 := i-k, i+k+1
			if r1 < 0 {
				r1 = 0
			}
			if r2 > m {
				r2 = m
			}
			c1, c2 := j-k, j+k+1
			if c1 < 0 {
				c1 = 0
			}
			if c2 > n {
				c2 = n
			}
			// Four lookups with alternating signs: O(1) for any k.
			answer[i][j] = prefix[r2][c2] - prefix[r1][c2] - prefix[r2][c1] + prefix[r1][c1]
		}
	}
	return answer
}
