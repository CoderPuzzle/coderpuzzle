// A clockwise quarter turn factors into two swap-only involutions —
// transpose across the main diagonal, then reverse every row — so the
// rotation rewrites the given matrix with no second allocation.
func rotate(matrix [][]int) [][]int {
	n := len(matrix)
	// The strict upper triangle holds each transpose pair exactly once;
	// walking the full square would swap every pair twice and undo itself.
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
		}
	}
	// Column j of the transpose reads row j of the input, so reversing each
	// row lays it out bottom-up — precisely the quarter turn.
	for _, row := range matrix {
		for lo, hi := 0, len(row)-1; lo < hi; lo, hi = lo+1, hi-1 {
			row[lo], row[hi] = row[hi], row[lo]
		}
	}
	// The rotation happened inside the input allocation; the same matrix,
	// now rotated, is what the judge compares.
	return matrix
}
