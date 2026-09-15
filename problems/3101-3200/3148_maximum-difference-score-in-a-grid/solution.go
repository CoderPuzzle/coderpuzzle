// Scores telescope: however many intermediate hops a journey takes,
// its total is simply end - start. So only the endpoint pair matters,
// and the end must sit strictly below or to the right of the start
// (componentwise). A row-major sweep carries prefixMin[r][c], the
// smallest value in the rectangle on or above-left of (r, c); strip
// the cell itself from that rectangle and what remains is exactly its
// legal start set, split as "row above" plus "running minimum to the
// left". Answers stay within ±(10⁵ − 1); the int64 accumulator simply
// matches the declared return.
func maxScore(grid [][]int) int64 {
	m, n := len(grid), len(grid[0])
	const big = int64(1e18)
	prefixMin := make([][]int64, m)
	for r := range prefixMin {
		prefixMin[r] = make([]int64, n)
	}
	best := -big
	for r := 0; r < m; r++ {
		rowRunning := big
		for c := 0; c < n; c++ {
			above := big
			if r > 0 {
				above = prefixMin[r-1][c]
			}
			startVal := min(above, rowRunning)
			best = max(best, int64(grid[r][c])-startVal)
			rowRunning = min(rowRunning, int64(grid[r][c]))
			prefixMin[r][c] = min(startVal, int64(grid[r][c]))
		}
	}
	return best
}
