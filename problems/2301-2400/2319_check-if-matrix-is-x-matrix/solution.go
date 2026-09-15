func checkXMatrix(grid [][]int) bool {
	size := len(grid)
	for row := 0; row < size; row++ {
		for col := 0; col < size; col++ {
			if row == col || row+col == size-1 {
				if grid[row][col] == 0 {
					return false
				}
			} else if grid[row][col] != 0 {
				return false
			}
		}
	}
	return true
}
