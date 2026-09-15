func rangeAddQueries(n int, queries [][]int) [][]int {
	// 2-D difference trick applied row by row.
	diff := make([][]int, n)
	mat := make([][]int, n)
	for r := 0; r < n; r++ {
		diff[r] = make([]int, n+1)
		mat[r] = make([]int, n)
	}
	for _, q := range queries {
		for r := q[0]; r <= q[2]; r++ {
			diff[r][q[1]]++
			diff[r][q[3]+1]--
		}
	}
	for r := 0; r < n; r++ {
		running := 0
		for c := 0; c < n; c++ {
			running += diff[r][c]
			mat[r][c] = running
		}
	}
	return mat
}
