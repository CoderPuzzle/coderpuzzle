// The -1 fill doubles as the unvisited marker. A cursor advances along the
// clockwise right/down/left/up cycle and rotates 90 degrees whenever the
// candidate cell leaves the grid or was already written; it stops when the
// list runs out, leaving every unwritten cell at -1.
func spiralMatrix(m int, n int, head *ListNode) [][]int {
	matrix := make([][]int, m)
	for row := range matrix {
		matrix[row] = make([]int, n)
		for column := range matrix[row] {
			matrix[row][column] = -1
		}
	}
	directions := [4][2]int{{0, 1}, {1, 0}, {0, -1}, {-1, 0}}
	row, column, direction := 0, 0, 0
	node := head
	for node != nil {
		matrix[row][column] = node.Val
		node = node.Next
		if node == nil {
			break
		}
		nextRow := row + directions[direction][0]
		nextColumn := column + directions[direction][1]
		if nextRow < 0 || nextRow >= m || nextColumn < 0 || nextColumn >= n ||
			matrix[nextRow][nextColumn] != -1 {
			direction = (direction + 1) % 4
			nextRow = row + directions[direction][0]
			nextColumn = column + directions[direction][1]
		}
		row, column = nextRow, nextColumn
	}
	return matrix
}
