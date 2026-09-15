func maxProductPath(grid [][]int) int {
	const mod = 1_000_000_007
	m := len(grid)
	n := len(grid[0])
	maxRow := make([]int64, n)
	minRow := make([]int64, n)
	maxRow[0] = int64(grid[0][0])
	minRow[0] = maxRow[0]
	for j := 1; j < n; j++ {
		value := maxRow[j-1] * int64(grid[0][j])
		maxRow[j] = value
		minRow[j] = value
	}

	for i := 1; i < m; i++ {
		newMax := make([]int64, n)
		newMin := make([]int64, n)
		value := maxRow[0] * int64(grid[i][0])
		newMax[0] = value
		newMin[0] = value
		for j := 1; j < n; j++ {
			cur := int64(grid[i][j])
			a := maxRow[j] * cur
			b := minRow[j] * cur
			c := newMax[j-1] * cur
			d := newMin[j-1] * cur
			newMax[j] = max(max(a, b), max(c, d))
			newMin[j] = min(min(a, b), min(c, d))
		}
		maxRow = newMax
		minRow = newMin
	}

	best := maxRow[n-1]
	if best < 0 {
		return -1
	}
	return int(best % mod)
}
