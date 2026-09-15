func minimumTotal(triangle [][]int) int {
	n := len(triangle)
	// dp[i] = minimum path sum from column i of the current row to the
	// bottom. The last row seeds it directly: a path starting there is
	// just that cell. Sums accumulate in int64s for headroom.
	dp := make([]int64, n)
	for i, v := range triangle[n-1] {
		dp[i] = int64(v)
	}
	// Work bottom-up: every cell has exactly the two children i and i+1
	// below, so no ragged-edge special cases like a top-down sweep.
	for row := n - 2; row >= 0; row-- {
		for i := range triangle[row] {
			// best = min(dp[i], dp[i+1]): the cheaper of the two downward
			// steps. Ascending i keeps dp[i+1] still holding the row
			// below's value when read; dp shrinks to dp[0] at the apex.
			best := dp[i]
			if dp[i+1] < best {
				best = dp[i+1]
			}
			dp[i] = int64(triangle[row][i]) + best
		}
	}
	return int(dp[0])
}
