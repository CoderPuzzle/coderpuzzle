// A row-major sweep collects the row indexes already sorted; a column-major
// sweep does the same for the column indexes, so neither axis needs an
// explicit sort. Manhattan distance adds the two axes independently, and on a
// line a median of the coordinates minimizes the sum of absolute differences,
// so the answer is the two spreads around the two medians.
func minTotalDistance(grid [][]int) int {
	var rows, cols []int
	for r := range grid {
		for c := range grid[r] {
			if grid[r][c] == 1 {
				rows = append(rows, r)
			}
		}
	}
	for c := range grid[0] {
		for r := range grid {
			if grid[r][c] == 1 {
				cols = append(cols, c)
			}
		}
	}
	// With an even count, every index between the two middle ones ties for
	// the minimum; the upper middle is as good as any.
	rowPivot := rows[len(rows)/2]
	colPivot := cols[len(cols)/2]
	total := 0
	for _, r := range rows {
		total += abs(r - rowPivot)
	}
	for _, c := range cols {
		total += abs(c - colPivot)
	}
	return total
}

// Magnitude of an axis offset; a helper only because Go has no abs for int.
func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
