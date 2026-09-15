// Reflections in both axes partition the cells into orbits that must end
// uniform: quadrant quadruples, pairs along the middle row/column of odd
// dimensions, and the lone center when both are odd. Price each orbit at
// its cheaper value, then settle the count of 1s modulo 4 over the small
// orbits: a quadruple holds a multiple of four 1s either way, a finished
// pair two, the center one — so the center always clears to 0 (2t + 1 is
// odd) and the pairs parked at 1 must be even in number. A split pair
// re-tunes between equal-cost states for free; otherwise one uniform pair
// pays 2 to switch to its dearer value.
func minFlips(grid [][]int) int {
	m, n := len(grid), len(grid[0])
	cost := 0
	for i := 0; i < m/2; i++ {
		for j := 0; j < n/2; j++ {
			ones := grid[i][j] + grid[i][n-1-j] + grid[m-1-i][j] + grid[m-1-i][n-1-j]
			cost += min(ones, 4-ones)
		}
	}
	splits, uniforms := 0, 0
	if m%2 == 1 {
		row := grid[m/2]
		for j := 0; j < n/2; j++ {
			ones := row[j] + row[n-1-j]
			cost += min(ones, 2-ones)
			if ones == 1 {
				splits++
			} else if ones == 2 {
				uniforms++
			}
		}
	}
	if n%2 == 1 {
		for i := 0; i < m/2; i++ {
			ones := grid[i][n/2] + grid[m-1-i][n/2]
			cost += min(ones, 2-ones)
			if ones == 1 {
				splits++
			} else if ones == 2 {
				uniforms++
			}
		}
	}
	if m%2 == 1 && n%2 == 1 {
		cost += grid[m/2][n/2]
	}
	if splits == 0 && uniforms%2 == 1 {
		cost += 2
	}
	return cost
}
