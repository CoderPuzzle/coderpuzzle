// dp[i][j] ends as the order of the largest plus centered at (i, j): every
// cell starts uncapped at n, mines drop to 0, then four directional sweeps
// cap it by the run of consecutive 1's that way.
func orderOfLargestPlusSign(n int, mines [][]int) int {
	dp := make([][]int, n)
	for i := range dp {
		dp[i] = make([]int, n)
		for j := range dp[i] {
			dp[i][j] = n
		}
	}
	for _, mine := range mines {
		dp[mine[0]][mine[1]] = 0
	}
	for i := 0; i < n; i++ {
		run := 0
		for j := 0; j < n; j++ {
			if dp[i][j] > 0 {
				run++
			} else {
				run = 0
			}
			if run < dp[i][j] {
				dp[i][j] = run
			}
		}
		run = 0
		for j := n - 1; j >= 0; j-- {
			if dp[i][j] > 0 {
				run++
			} else {
				run = 0
			}
			if run < dp[i][j] {
				dp[i][j] = run
			}
		}
	}
	for j := 0; j < n; j++ {
		run := 0
		for i := 0; i < n; i++ {
			if dp[i][j] > 0 {
				run++
			} else {
				run = 0
			}
			if run < dp[i][j] {
				dp[i][j] = run
			}
		}
		run = 0
		for i := n - 1; i >= 0; i-- {
			if dp[i][j] > 0 {
				run++
			} else {
				run = 0
			}
			if run < dp[i][j] {
				dp[i][j] = run
			}
		}
	}
	best := 0
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if dp[i][j] > best {
				best = dp[i][j]
			}
		}
	}
	return best
}
