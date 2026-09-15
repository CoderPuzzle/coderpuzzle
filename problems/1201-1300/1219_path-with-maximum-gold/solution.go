func getMaximumGold(grid [][]int) int {
	rows, cols := len(grid), len(grid[0])
	best := 0

	// walk collects the best continuation from (r, c). Zeroing on entry
	// doubles as the visited mark; restore on exit.
	var walk func(r, c int) int
	walk = func(r, c int) int {
		gold := grid[r][c]
		grid[r][c] = 0
		deepest := 0
		for _, step := range [4][2]int{{r - 1, c}, {r + 1, c}, {r, c - 1}, {r, c + 1}} {
			nr, nc := step[0], step[1]
			if nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] > 0 {
				if continuation := walk(nr, nc); continuation > deepest {
					deepest = continuation
				}
			}
		}
		grid[r][c] = gold
		return gold + deepest
	}

	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if grid[r][c] > 0 {
				if total := walk(r, c); total > best {
					best = total
				}
			}
		}
	}
	return best
}
