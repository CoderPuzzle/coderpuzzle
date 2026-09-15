func possibleToStamp(grid [][]int, stampHeight int, stampWidth int) bool {
	rows, columns := len(grid), len(grid[0])
	occupied := make([][]int, rows+1)
	difference := make([][]int, rows+1)
	for row := 0; row <= rows; row++ {
		occupied[row] = make([]int, columns+1)
		difference[row] = make([]int, columns+1)
	}
	for row := 0; row < rows; row++ {
		for column := 0; column < columns; column++ {
			occupied[row+1][column+1] = grid[row][column] + occupied[row][column+1] + occupied[row+1][column] - occupied[row][column]
		}
	}

	for top := 0; top+stampHeight <= rows; top++ {
		bottom := top + stampHeight
		for left := 0; left+stampWidth <= columns; left++ {
			right := left + stampWidth
			total := occupied[bottom][right] - occupied[top][right] - occupied[bottom][left] + occupied[top][left]
			if total == 0 {
				difference[top][left]++
				difference[bottom][left]--
				difference[top][right]--
				difference[bottom][right]++
			}
		}
	}

	for row := 0; row < rows; row++ {
		for column := 0; column < columns; column++ {
			if row > 0 {
				difference[row][column] += difference[row-1][column]
			}
			if column > 0 {
				difference[row][column] += difference[row][column-1]
			}
			if row > 0 && column > 0 {
				difference[row][column] -= difference[row-1][column-1]
			}
			if grid[row][column] == 0 && difference[row][column] == 0 {
				return false
			}
		}
	}
	return true
}
