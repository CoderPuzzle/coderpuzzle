func minDeletionSize(strs []string) int {
	deletions := 0
	rows, cols := len(strs), len(strs[0])
	for j := 0; j < cols; j++ {
		for i := 1; i < rows; i++ {
			// A column is condemned the moment a character drops below
			// the one above it; equal characters never condemn.
			if strs[i][j] < strs[i-1][j] {
				deletions++
				break
			}
		}
	}
	return deletions
}
