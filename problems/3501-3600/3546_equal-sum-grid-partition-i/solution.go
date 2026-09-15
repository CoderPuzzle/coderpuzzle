func canPartitionGrid(grid [][]int) bool {
	// One cut splits the grid into a run of whole rows or whole columns,
	// so scan run-prefix sums for total / 2. Totals reach 1e5 cells x
	// 1e5 = 1e10 — sums must be int64, not int.
	m, n := len(grid), len(grid[0])
	total := int64(0)
	for _, row := range grid {
		for _, v := range row {
			total += int64(v)
		}
	}
	if total%2 != 0 {
		return false
	}
	half := total / 2
	prefix := int64(0)
	for r := 0; r < m-1; r++ {
		for _, v := range grid[r] {
			prefix += int64(v)
		}
		if prefix == half {
			return true
		}
	}
	prefix = 0
	for c := 0; c < n-1; c++ {
		for _, row := range grid {
			prefix += int64(row[c])
		}
		if prefix == half {
			return true
		}
	}
	return false
}
