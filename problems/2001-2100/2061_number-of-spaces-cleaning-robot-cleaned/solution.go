func numberOfCleanRooms(room [][]int) int {
	rows, cols := len(room), len(room[0])
	dr := [4]int{0, 1, 0, -1}
	dc := [4]int{1, 0, -1, 0}
	seen := make([]bool, rows*cols*4)
	cleaned := make([]bool, rows*cols)
	row, col, direction := 0, 0, 0
	cleanCount := 0

	for !seen[(row*cols+col)*4+direction] {
		seen[(row*cols+col)*4+direction] = true
		cell := row*cols + col
		if !cleaned[cell] {
			cleaned[cell] = true
			cleanCount++
		}

		nextRow := row + dr[direction]
		nextCol := col + dc[direction]
		if nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols || room[nextRow][nextCol] == 1 {
			direction = (direction + 1) % 4
		} else {
			row, col = nextRow, nextCol
		}
	}
	return cleanCount
}
