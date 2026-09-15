func minCost(startPos []int, homePos []int, rowCosts []int, colCosts []int) int64 {
	total := int64(0)
	row := startPos[0]
	for row != homePos[0] {
		if row < homePos[0] {
			row++
		} else {
			row--
		}
		total += int64(rowCosts[row])
	}

	col := startPos[1]
	for col != homePos[1] {
		if col < homePos[1] {
			col++
		} else {
			col--
		}
		total += int64(colCosts[col])
	}
	return total
}
