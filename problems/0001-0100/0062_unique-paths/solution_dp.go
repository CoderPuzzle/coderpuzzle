func uniquePaths(m int, n int) int {
	// One rolling row, seeded with the all-ones counts of the first row.
	row := make([]int, n)
	for j := range row {
		row[j] = 1
	}
	for i := 1; i < m; i++ {
		// row[j] still holds the count from the cell above while row[j-1]
		// was already rewritten this pass, so += applies paths = up + left.
		for j := 1; j < n; j++ {
			row[j] += row[j-1]
		}
	}
	return row[n-1]
}
