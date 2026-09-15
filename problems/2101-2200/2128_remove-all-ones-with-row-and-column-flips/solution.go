func removeOnes(grid [][]int) bool {
	for row := range grid {
		for column := range grid[0] {
			if grid[row][column]^grid[row][0]^grid[0][column]^grid[0][0] != 0 {
				return false
			}
		}
	}
	return true
}
