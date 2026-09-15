func numMagicSquaresInside(grid [][]int) int {
	// Every 3 x 3 window is judged independently, so the scan visits each
	// window's top-left corner and tests it; a grid shorter than three
	// rows or columns leaves the sweep empty.
	rows, cols := len(grid), len(grid[0])
	count := 0
	for r := 0; r+2 < rows; r++ {
		for c := 0; c+2 < cols; c++ {
			if isMagic(grid, r, c) {
				count++
			}
		}
	}
	return count
}

// Nine distinct values 1..9 total 45, so the four lines through the
// center add to 4*15 = 45 + 3*center — the center must be 5. One
// comparison clears most windows; survivors need every row, column, and
// diagonal at 15, plus a seen-set for distinctness and range: the sums
// alone also bless duplicate and out-of-range arrangements.
func isMagic(grid [][]int, r, c int) bool {
	if grid[r+1][c+1] != 5 {
		return false
	}
	for i := 0; i < 3; i++ {
		if grid[r+i][c]+grid[r+i][c+1]+grid[r+i][c+2] != 15 {
			return false
		}
		if grid[r][c+i]+grid[r+1][c+i]+grid[r+2][c+i] != 15 {
			return false
		}
	}
	if grid[r][c]+grid[r+1][c+1]+grid[r+2][c+2] != 15 {
		return false
	}
	if grid[r][c+2]+grid[r+1][c+1]+grid[r+2][c] != 15 {
		return false
	}
	var seen [10]bool
	for i := 0; i < 3; i++ {
		for j := 0; j < 3; j++ {
			v := grid[r+i][c+j]
			if v < 1 || v > 9 || seen[v] {
				return false
			}
			seen[v] = true
		}
	}
	return true
}
