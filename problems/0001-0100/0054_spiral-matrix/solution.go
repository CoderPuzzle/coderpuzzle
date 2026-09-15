// Boundary-shrinking walk: emit the ring of the matrix that is left — top
// row, right column, bottom row, left column — then shrink every boundary
// inward by one and repeat until every element is emitted.
func spiralOrder(matrix [][]int) []int {
	rows, columns := len(matrix), len(matrix[0])
	top, bottom := 0, rows-1
	left, right := 0, columns-1
	order := []int{}
	for len(order) < rows*columns {
		for column := left; column <= right; column++ {
			order = append(order, matrix[top][column])
		}
		for row := top + 1; row <= bottom; row++ {
			order = append(order, matrix[row][right])
		}
		if top != bottom {
			// Leftwards along the bottom row, stopping before the corner
			// the right-column run already emitted.
			for column := right - 1; column >= left; column-- {
				order = append(order, matrix[bottom][column])
			}
		}
		if left != right {
			// Upwards along the left column, stopping before the corner
			// the top-row run already emitted.
			for row := bottom - 1; row > top; row-- {
				order = append(order, matrix[row][left])
			}
		}
		top++
		bottom--
		left++
		right--
	}
	return order
}
