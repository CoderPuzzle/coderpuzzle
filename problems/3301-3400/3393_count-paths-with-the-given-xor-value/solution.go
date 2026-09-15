func countPathsWithXorValue(grid [][]int, k int) int {
	const MOD = 1000000007
	m := len(grid)
	n := len(grid[0])
	// dp[i][j][x] = number of paths from (0,0) to (i,j) whose XOR is x
	dp := make([][][16]int, m)
	for i := range dp {
		dp[i] = make([][16]int, n)
	}
	dp[0][0][grid[0][0]] = 1
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if i == 0 && j == 0 {
				continue
			}
			cell := grid[i][j]
			for x := 0; x < 16; x++ {
				total := 0
				if i > 0 {
					total += dp[i-1][j][x^cell]
				}
				if j > 0 {
					total += dp[i][j-1][x^cell]
				}
				dp[i][j][x] = total % MOD
			}
		}
	}
	return dp[m-1][n-1][k]
}
