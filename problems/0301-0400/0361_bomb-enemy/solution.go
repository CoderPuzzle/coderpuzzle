// A bomb planted on an empty cell kills along its row and column until a
// wall, so its reach is the two wall-free segments crossing the cell. Every
// empty cell in a segment shares that segment's enemies: count each segment
// once and reuse the count.
func maxKilledEnemies(grid [][]string) int {
	m := len(grid)
	n := len(grid[0])
	colHits := make([]int, n)
	best := 0
	for i := 0; i < m; i++ {
		rowHits := 0
		for j := 0; j < n; j++ {
			// First cell of a row segment (after a wall or at the left
			// edge): one scan counts the enemies up to the next wall.
			if j == 0 || grid[i][j-1] == "W" {
				rowHits = countRow(grid, i, j)
			}
			// Same lazily per column: recount only when the cell above is
			// a wall or the top edge.
			if i == 0 || grid[i-1][j] == "W" {
				colHits[j] = countCol(grid, i, j)
			}
			if grid[i][j] == "0" {
				best = max(best, rowHits+colHits[j])
			}
		}
	}
	return best
}

// Enemies in row i from column j up to the next wall.
func countRow(grid [][]string, i, j int) int {
	hits := 0
	for k := j; k < len(grid[i]) && grid[i][k] != "W"; k++ {
		if grid[i][k] == "E" {
			hits++
		}
	}
	return hits
}

// Enemies in column j from row i down to the next wall.
func countCol(grid [][]string, i, j int) int {
	hits := 0
	for k := i; k < len(grid) && grid[k][j] != "W"; k++ {
		if grid[k][j] == "E" {
			hits++
		}
	}
	return hits
}
