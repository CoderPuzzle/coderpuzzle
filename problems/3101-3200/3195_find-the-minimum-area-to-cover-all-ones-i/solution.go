// Every 1 must lie inside the answer, so the rectangle is pinned to the
// topmost, bottommost, leftmost and rightmost 1; any smaller box would
// exclude one of those extreme cells. One sweep tracking the four extremes
// settles it.
func minimumArea(grid [][]int) int {
	minRow := len(grid)
	maxRow := -1
	minCol := len(grid[0])
	maxCol := -1
	for i, row := range grid {
		first := -1
		last := -1
		for j, v := range row {
			if v == 1 {
				if first == -1 {
					first = j
				}
				last = j
			}
		}
		if first == -1 {
			continue
		}
		minRow = min(minRow, i)
		maxRow = i
		minCol = min(minCol, first)
		maxCol = max(maxCol, last)
	}
	return (maxRow - minRow + 1) * (maxCol - minCol + 1)
}
