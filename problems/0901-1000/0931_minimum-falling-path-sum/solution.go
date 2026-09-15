// Sweep the rows top to bottom carrying one row of answers: dp[j] is the
// smallest sum of a falling path ending at the current row's column j,
// built from the three reachable parents above.
func minFallingPathSum(matrix [][]int) int {
	n := len(matrix[0])
	dp := append([]int(nil), matrix[0]...)
	for _, row := range matrix[1:] {
		next := make([]int, n)
		for j := 0; j < n; j++ {
			best := dp[j]
			if j > 0 && dp[j-1] < best {
				best = dp[j-1]
			}
			if j+1 < n && dp[j+1] < best {
				best = dp[j+1]
			}
			next[j] = row[j] + best
		}
		dp = next
	}
	ans := dp[0]
	for _, v := range dp[1:] {
		if v < ans {
			ans = v
		}
	}
	return ans
}
