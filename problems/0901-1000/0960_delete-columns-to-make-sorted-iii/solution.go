func minDeletionSize(strs []string) int {
	rows, cols := len(strs), len(strs[0])
	// dp[j] = the most columns a valid surviving chain can hold when it
	// ends at column j; a later column extends it only when no row
	// descends between the two columns.
	dp := make([]int, cols)
	for j := range dp {
		dp[j] = 1
	}
	best := 1
	for j := 0; j < cols; j++ {
		for i := 0; i < j; i++ {
			ok := true
			for r := 0; r < rows && ok; r++ {
				if strs[r][i] > strs[r][j] {
					ok = false
				}
			}
			if ok && dp[i]+1 > dp[j] {
				dp[j] = dp[i] + 1
			}
		}
		if dp[j] > best {
			best = dp[j]
		}
	}
	return cols - best
}
