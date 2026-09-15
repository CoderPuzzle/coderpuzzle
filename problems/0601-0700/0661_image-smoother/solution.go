// Each output cell averages the 3x3 window around it, clamped to the matrix,
// so border cells average fewer than nine values; writing into a fresh matrix
// keeps every window reading unsmoothed input.
func imageSmoother(img [][]int) [][]int {
	m, n := len(img), len(img[0])
	smoothed := make([][]int, m)
	for row := range smoothed {
		smoothed[row] = make([]int, n)
	}
	// The window rows run from max(i-1, 0) to min(i+2, m) and the columns
	// likewise; summing in integers and floor-dividing by the count is the
	// rounding-down average (values are non-negative, so / floors).
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			total, count := 0, 0
			for r := max(i-1, 0); r < min(i+2, m); r++ {
				for c := max(j-1, 0); c < min(j+2, n); c++ {
					total += img[r][c]
					count++
				}
			}
			smoothed[i][j] = total / count
		}
	}
	return smoothed
}
