func countLocalMaximums(matrix [][]int) int {
	rows, columns := len(matrix), len(matrix[0])
	type position struct{ row, column int }
	positions := make([][]position, 201)
	for row := 0; row < rows; row++ {
		for column := 0; column < columns; column++ {
			if matrix[row][column] != 0 {
				value := matrix[row][column]
				positions[value] = append(positions[value], position{row, column})
			}
		}
	}
	answer := 0
	for value := 1; value <= 200; value++ {
		if len(positions[value]) == 0 {
			continue
		}
		prefix := make([][]int, rows+1)
		for row := range prefix {
			prefix[row] = make([]int, columns+1)
		}
		for row := 0; row < rows; row++ {
			running := 0
			for column := 0; column < columns; column++ {
				if matrix[row][column] > value {
					running++
				}
				prefix[row+1][column+1] = prefix[row][column+1] + running
			}
		}
		for _, item := range positions[value] {
			top, bottom := max(0, item.row-value), min(rows-1, item.row+value)
			left, right := max(0, item.column-value), min(columns-1, item.column+value)
			greater := prefix[bottom+1][right+1] - prefix[top][right+1] -
				prefix[bottom+1][left] + prefix[top][left]
			for _, cornerRow := range []int{item.row - value, item.row + value} {
				for _, cornerColumn := range []int{item.column - value, item.column + value} {
					if cornerRow >= 0 && cornerRow < rows && cornerColumn >= 0 && cornerColumn < columns &&
						matrix[cornerRow][cornerColumn] > value {
						greater--
					}
				}
			}
			if greater == 0 {
				answer++
			}
		}
	}
	return answer
}
