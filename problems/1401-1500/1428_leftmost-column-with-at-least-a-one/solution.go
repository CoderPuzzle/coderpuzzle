package main

type Solution struct{}

func (solution *Solution) leftMostColumnWithOne(matrix *BinaryMatrix) int {
	size := matrix.Dimensions()
	rows, cols := size[0], size[1]
	// Staircase from the top-right corner: on a 1 this is the best column
	// so far (step left — nothing further right matters), on a 0 this row
	// is exhausted at or after this column (step down).
	answer := -1
	row, col := 0, cols-1
	for row < rows && col >= 0 {
		if matrix.Get(row, col) == 1 {
			answer = col
			col--
		} else {
			row++
		}
	}
	return answer
}
