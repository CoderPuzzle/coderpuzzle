func maxMoves(grid [][]int) int {
	rows, columns := len(grid), len(grid[0])
	reachable := make([]bool, rows)
	for row := range reachable {
		reachable[row] = true
	}
	moves := 0
	for column := 0; column+1 < columns; column++ {
		next := make([]bool, rows)
		reached := 0
		for row := 0; row < rows; row++ {
			if !reachable[row] {
				continue
			}
			value := grid[row][column]
			for target := max(0, row-1); target < min(rows, row+2); target++ {
				if !next[target] && grid[target][column+1] > value {
					next[target] = true
					reached++
				}
			}
		}
		if reached == 0 {
			break
		}
		reachable = next
		moves++
	}
	return moves
}
