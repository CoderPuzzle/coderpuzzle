func minPathCost(grid [][]int, moveCost [][]int) int {
	rows, columns := len(grid), len(grid[0])
	costs := append([]int(nil), grid[0]...)
	for row := 1; row < rows; row++ {
		previous := grid[row-1]
		next := make([]int, columns)
		for column := 0; column < columns; column++ {
			best := costs[0] + moveCost[previous[0]][column]
			for source := 1; source < columns; source++ {
				if candidate := costs[source] + moveCost[previous[source]][column]; candidate < best {
					best = candidate
				}
			}
			next[column] = best + grid[row][column]
		}
		costs = next
	}
	answer := costs[0]
	for _, cost := range costs[1:] {
		if cost < answer {
			answer = cost
		}
	}
	return answer
}
