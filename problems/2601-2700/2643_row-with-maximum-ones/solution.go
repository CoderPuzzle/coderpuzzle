func rowAndMaximumOnes(mat [][]int) []int {
	// One scan carries the best (count, row) pair seen so far; only a
	// strictly greater count replaces the incumbent, so among tied rows
	// the smallest index automatically survives.
	bestRow, bestCount := 0, -1
	for rowIndex, row := range mat {
		count := 0
		for _, value := range row {
			if value == 1 {
				count++
			}
		}
		if count > bestCount {
			bestCount = count
			bestRow = rowIndex
		}
	}
	return []int{bestRow, bestCount}
}
