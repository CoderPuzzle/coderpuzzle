func countPyramids(grid [][]int) int {
	return countDirection(grid, false) + countDirection(grid, true)
}

func countDirection(grid [][]int, forward bool) int {
	rows, columns := len(grid), len(grid[0])
	towardBase := make([]int, columns)
	total := 0
	for offset := 0; offset < rows; offset++ {
		row := rows - 1 - offset
		if forward {
			row = offset
		}
		current := make([]int, columns)
		for column := 0; column < columns; column++ {
			if grid[row][column] == 0 {
				continue
			}
			current[column] = 1
			if column > 0 && column+1 < columns && towardBase[column] > 0 {
				current[column] += min(towardBase[column-1], towardBase[column+1])
			}
			total += current[column] - 1
		}
		towardBase = current
	}
	return total
}
