func minDeletionSize(strs []string) int {
	deletions := 0
	rows, cols := len(strs), len(strs[0])
	// cut[i]: rows i and i+1 are already strictly ordered on the kept
	// prefix, so later columns no longer constrain that pair.
	cut := make([]bool, rows-1)
	for j := 0; j < cols; j++ {
		bad := false
		for i := 0; i+1 < rows; i++ {
			if !cut[i] && strs[i][j] > strs[i+1][j] {
				// A still-undecided pair drops here: the column must go.
				bad = true
				break
			}
		}
		if bad {
			deletions++
			continue
		}
		for i := 0; i+1 < rows; i++ {
			if !cut[i] && strs[i][j] < strs[i+1][j] {
				// A strict rise settles the pair for every later column.
				cut[i] = true
			}
		}
	}
	return deletions
}
