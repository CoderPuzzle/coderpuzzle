// dp[r][c] is the set of balances reachable at that cell, where the balance
// counts '(' minus ')' along the path. A prefix whose balance ever goes
// negative can never close into a valid string, so those balances are
// dropped as each move is extended.
func hasValidPath(grid [][]string) bool {
	m := len(grid)
	n := len(grid[0])
	start := 1
	if grid[0][0] == ")" {
		start = -1
	}
	if start < 0 {
		return false
	}
	dp := make([][]map[int]bool, m)
	for r := range dp {
		dp[r] = make([]map[int]bool, n)
		for c := range dp[r] {
			dp[r][c] = make(map[int]bool)
		}
	}
	dp[0][0][start] = true
	for r := 0; r < m; r++ {
		for c := 0; c < n; c++ {
			for balance := range dp[r][c] {
				if r+1 < m {
					nb := balance + 1
					if grid[r+1][c] == ")" {
						nb = balance - 1
					}
					if nb >= 0 {
						dp[r+1][c][nb] = true
					}
				}
				if c+1 < n {
					nb := balance + 1
					if grid[r][c+1] == ")" {
						nb = balance - 1
					}
					if nb >= 0 {
						dp[r][c+1][nb] = true
					}
				}
			}
		}
	}
	return dp[m-1][n-1][0]
}
