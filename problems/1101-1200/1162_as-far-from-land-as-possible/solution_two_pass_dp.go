func maxDistance(grid [][]int) int {
	n := len(grid)
	// distance field: land starts at 0, water at a sentinel standing in
	// for infinity; any value above the largest possible distance
	// (2n - 2) is safe, and n * n is a convenient pick
	inf := n * n
	dist := make([][]int, n)
	hasLand, hasWater := false, false
	for i := 0; i < n; i++ {
		dist[i] = make([]int, n)
		for j := 0; j < n; j++ {
			if grid[i][j] == 1 {
				dist[i][j] = 0
				hasLand = true
			} else {
				dist[i][j] = inf
				hasWater = true
			}
		}
	}
	// all water (nothing to measure from) or all land (nothing to measure)
	if !hasLand || !hasWater {
		return -1
	}
	// two-pass DP, first sweep: top-left to bottom-right, so every cell
	// relaxes against its up and left neighbors plus one step
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			if i > 0 && dist[i-1][j]+1 < dist[i][j] {
				dist[i][j] = dist[i-1][j] + 1
			}
			if j > 0 && dist[i][j-1]+1 < dist[i][j] {
				dist[i][j] = dist[i][j-1] + 1
			}
		}
	}
	// second sweep: bottom-right to top-left, covering down and right; the
	// four directions together span every Manhattan path
	best := 0
	for i := n - 1; i >= 0; i-- {
		for j := n - 1; j >= 0; j-- {
			if i+1 < n && dist[i+1][j]+1 < dist[i][j] {
				dist[i][j] = dist[i+1][j] + 1
			}
			if j+1 < n && dist[i][j+1]+1 < dist[i][j] {
				dist[i][j] = dist[i][j+1] + 1
			}
			// land stays at 0, so a plain running max over the field works
			if dist[i][j] > best {
				best = dist[i][j]
			}
		}
	}
	return best
}
