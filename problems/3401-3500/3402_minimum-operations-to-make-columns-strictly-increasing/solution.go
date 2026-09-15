// Columns are independent: a cell only has to top the cell directly above
// it, so one top-to-bottom sweep settles everything. Raising each cell to
// exactly one above the cell above is the pointwise minimum final column,
// so no cheaper fix exists.
func minimumOperations(grid [][]int) int {
	previous := make([]int, len(grid[0]))
	copy(previous, grid[0])
	operations := 0
	for _, row := range grid[1:] {
		for j, value := range row {
			if value <= previous[j] {
				operations += previous[j] + 1 - value
				previous[j]++
			} else {
				previous[j] = value
			}
		}
	}
	return operations
}
