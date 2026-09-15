func maxConsistentColumns(grid [][]int, limit int) int {
	rows := len(grid)
	cols := len(grid[0])
	compatible := make([][]bool, cols)
	for i := range compatible {
		compatible[i] = make([]bool, cols)
	}
	for a := 0; a < cols; a++ {
		for b := a + 1; b < cols; b++ {
			ok := true
			for r := 0; r < rows; r++ {
				diff := grid[r][b] - grid[r][a]
				if diff < 0 {
					diff = -diff
				}
				if diff > limit {
					ok = false
					break
				}
			}
			compatible[a][b] = ok
		}
	}

	dp := make([]int, cols)
	for i := range dp {
		dp[i] = 1
	}
	answer := 1
	for j := 0; j < cols; j++ {
		for i := 0; i < j; i++ {
			if compatible[i][j] && dp[i]+1 > dp[j] {
				dp[j] = dp[i] + 1
			}
		}
		if dp[j] > answer {
			answer = dp[j]
		}
	}
	return answer
}
