// Totals reach ~2 * 10^10 on the largest inputs, so dp is int64.
func minCost(m int, n int, waitCost [][]int) int64 {
	// Between two consecutive moves a path waits once, on the cell it is
	// leaving — never before the first move or after the last. dp[j] is the
	// cheapest cost of standing on (i, j), entry paid plus every earlier
	// departed cell's wait.
	prev := make([]int64, n)
	dp := make([]int64, n)
	// First row: reachable only from the left; entry cost is j + 1.
	dp[0] = 1
	for j := 1; j < n; j++ {
		// The start's departure skips its wait; move 1 is immediate.
		wait := int64(waitCost[0][j-1])
		if j == 1 {
			wait = 0
		}
		dp[j] = dp[j-1] + wait + int64(j+1)
	}
	for i := 1; i < m; i++ {
		dp, prev = prev, dp
		// First column: reachable only from above.
		first := int64(waitCost[i-1][0])
		if i == 1 {
			first = 0
		}
		dp[0] = prev[0] + first + int64(i+1)
		for j := 1; j < n; j++ {
			dp[j] = min(prev[j]+int64(waitCost[i-1][j]), dp[j-1]+int64(waitCost[i][j-1])) +
				int64(i+1)*int64(j+1)
		}
	}
	return dp[n-1]
}
