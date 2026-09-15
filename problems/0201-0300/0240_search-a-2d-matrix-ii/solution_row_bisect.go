func searchMatrix(matrix [][]int, target int) bool {
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return false
	}
	cols := len(matrix[0])
	for _, row := range matrix {
		// Columns are sorted, so once a row's first element already exceeds
		// the target, every later row starts even larger — the target cannot
		// exist below, so stop scanning entirely.
		if row[0] > target {
			break
		}
		// Each row is sorted, so binary-search it in O(log n).
		lo, hi := 0, cols-1
		for lo < hi {
			mid := (lo + hi) / 2
			if row[mid] < target {
				lo = mid + 1
			} else {
				hi = mid
			}
		}
		// lo lands on the leftmost element >= target; equality means the
		// target is present in this row.
		if row[lo] == target {
			return true
		}
	}
	// m rows each searched in O(log n): O(m log n), versus the staircase's
	// O(m + n).
	return false
}
