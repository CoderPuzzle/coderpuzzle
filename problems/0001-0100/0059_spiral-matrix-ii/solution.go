// Boundary-shrinking walk: fill the ring of the matrix that is left — top
// row, right column, bottom row, left column — with the next run of
// consecutive values, then shrink every boundary inward by one and repeat
// until every cell is written.
func generateMatrix(n int) [][]int {
	matrix := make([][]int, n)
	for row := range matrix {
		matrix[row] = make([]int, n)
	}
	top, bottom := 0, n-1
	left, right := 0, n-1
	value := 1
	for value <= n*n {
		for column := left; column <= right; column++ {
			matrix[top][column] = value
			value++
		}
		for row := top + 1; row <= bottom; row++ {
			matrix[row][right] = value
			value++
		}
		if top != bottom {
			// Leftwards along the bottom row, stopping before the corner
			// the right-column run already filled.
			for column := right - 1; column >= left; column-- {
				matrix[bottom][column] = value
				value++
			}
		}
		if left != right {
			// Upwards along the left column, stopping before the corner
			// the top-row run already filled.
			for row := bottom - 1; row > top; row-- {
				matrix[row][left] = value
				value++
			}
		}
		top++
		bottom--
		left++
		right--
	}
	return matrix
}
